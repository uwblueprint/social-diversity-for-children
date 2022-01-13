import Wrapper from "@components/AdminWrapper";
import colourTheme from "@styles/colours";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";
import { DateField } from "@components/formFields/DateField";
import { TextField } from "@components/formFields/TextField";
import { SelectField } from "@components/formFields/SelectField";
import { UploadField } from "@components/formFields/UploadField";
import { CheckBoxField } from "@components/formFields/CheckBoxField";
import { AdminHeader } from "@components/admin/AdminHeader";
import "react-datepicker/dist/react-datepicker.css";
import useUsers from "@utils/hooks/useUsers";
import React, { useEffect, useState } from "react";
import { Session } from "next-auth";
import { locale } from ".prisma/client";
import { MultipleTextField } from "@components/formFields/MuitipleTextField";
import { infoToastOptions, errorToastOptions } from "@utils/toast/options";
import { useRouter } from "next/router";
import { AdminModal } from "@components/admin/AdminModal";
import { weekday } from "@prisma/client";
import useStripePrice from "@utils/hooks/useStripePrice";
import usePrograms from "@utils/hooks/usePrograms";
import useClass from "@utils/hooks/useClass";
import { AdminError } from "@components/AdminError";
import { AdminLoading } from "@components/AdminLoading";
import { isAdmin } from "@utils/session/authorization";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";

type Props = {
    session: Session;
};

// TODO: When changing archive, the backend should use updateClassArchive instead of just changing the raw column value
export default function CreateClass({ session }: Props): JSX.Element {
    const toast = useToast();
    const router = useRouter();

    const EDIT = true;

    const [saveModalOpen, setSaveModalOpen] = useState(false);
    const sortedLocale = Object.keys(locale).sort();

    const { teachers } = useUsers();

    const [id, setId] = useState(-1);
    const [image, setImage] = useState("https://via.placeholder.com/200x175?text=Cover%20Photo");

    const [className, setClassName] = useState("");
    const [associatedProgram, setAssociatedProgram] = useState("");

    const [teacherName, setTeacherName] = useState("");
    const [durationMinutes, setDurationMinutes] = useState("");

    const [isArchived, setIsArchived] = useState(false);

    const [repeatOn, setRepeatOn] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startDate, setStartDate] = useState("");

    const [age, setAge] = useState("");
    const [aboveUnder, setAboveUnder] = useState("");
    const [maxCapacity, setMaxCapacity] = useState("");
    const [volunteerCapacity, setVolunteerCapacity] = useState("");
    const [price, setPrice] = useState("");

    const [classDescription, setClassDescription] = useState(
        Array(sortedLocale.length).join(".").split("."),
    );

    //Used to make sure we don't create a new stripe id when editing the class
    //If the price changes we'll add another price
    const [stripeId, setStripeId] = useState("");

    const [isClassLoad, setIsClassLoad] = useState(false);
    const [isPriceLoad, setIsPriceLoad] = useState(false);

    const {
        programs,
        isLoading: isProgramLoading,
        error: programError,
    } = usePrograms(locale.en, false);
    const {
        classCard,
        isLoading: isClassLoading,
        mutate: mutateClass,
    } = useClass(router.query.id as string, locale.en, true);
    const {
        stripePrice,
        isLoading: isPriceLoading,
        mutate: mutatePrice,
    } = useStripePrice(classCard?.stripePriceId);

    useEffect(() => {
        if (classCard && programs && !isClassLoad && teachers) {
            setClassName(classCard.name);
            setAssociatedProgram(classCard.programName);

            //update class descriptions
            setClassDescription([
                ...classCard.translations.map((translation) => translation.description),
            ]);
            const teacher = teachers?.find((teacher) => teacher.id === classCard.teacherId);
            if (teacher) {
                setTeacherName(teacher.firstName + " " + teacher.lastName);
            }
            setStartDate(classCard.startDate.toString());
            setEndDate(classCard.endDate.toString());
            setImage(classCard.image);
            setId(classCard.id);
            setIsArchived(classCard.isArchived);
            setRepeatOn(classCard.weekday);
            setAge(classCard.borderAge?.toString());
            setAboveUnder(classCard.isAgeMinimal ? "Under" : "Above");
            setMaxCapacity(classCard.spaceTotal.toString());
            setVolunteerCapacity(classCard.volunteerSpaceTotal.toString());
            setStripeId(classCard.stripePriceId);
            setDurationMinutes(classCard.durationMinutes.toString());
            setIsClassLoad(true);
        }
    }, [classCard, teachers]);

    useEffect(() => {
        if (stripePrice && !isPriceLoad) {
            // Get stripe price in dollars
            setPrice((stripePrice.unit_amount / 100).toString());
            setIsPriceLoad(true);
        }
    }, [stripePrice]);

    async function save() {
        const classclassCard = {
            programId: programs.find((program) => program.name === associatedProgram).id,
            imageLink: image,
            isAgeMinimal: aboveUnder === "Under",
            spaceTotal: parseInt(maxCapacity),
            volunteerSpaceTotal: parseInt(volunteerCapacity),
            stripePriceId: stripeId,
            borderAge: parseInt(age),
            weekday: repeatOn,
            name: className,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            price,
            id,
            durationMinutes: parseInt(durationMinutes),
            teacherRegs: [
                {
                    teacherId: teachers.find((t) => t.firstName + " " + t.lastName === teacherName)
                        .id,
                },
            ],
        };

        //Create an array of translation objects from the name and description
        const translationclassCard = [];
        classDescription.forEach((description, index) => {
            if (description.length !== 0) {
                translationclassCard.push({
                    name: className,
                    description,
                    language: sortedLocale[index],
                });
            }
        });

        const classCard = {
            classInput: classclassCard,
            classTranslationInput: translationclassCard,
        };
        //Save to classCardbase
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(classCard),
        };
        const response = await fetch("/api/class", request);
        const programId = programs.find((program) => program.name === associatedProgram).id;

        if (response.ok) {
            mutateClass();
            mutatePrice();

            if (id !== -1) {
                toast(
                    infoToastOptions("Class Edited", `${className} has been successfully edited!`),
                );
                router.push(`/admin/program/${programId}`);
            } else {
                toast(
                    infoToastOptions(
                        "Class Created",
                        `${className} has been successfully added! This can be monitored and edited in Classes.`,
                    ),
                );
                localStorage.clear();
                router.push(`/admin`);
            }
        } else {
            errorToastOptions("Failed to create class", response.statusText);
        }
    }

    if (programError) {
        return <AdminError cause="cannot fetch programs" />;
    } else if (isProgramLoading || isClassLoading || isPriceLoading) {
        return <AdminLoading />;
    }

    return (
        <Wrapper session={session}>
            <AdminHeader>{id === -1 ? "Create" : "Edit"}</AdminHeader>
            {id === -1 ? (
                <HStack spacing={8} alignSelf="start" style={{ margin: 25, marginLeft: 50 }}>
                    <a href="/admin/program/edit/new">Program</a>
                    <a
                        href="/admin/class/edit/new"
                        style={{ color: colourTheme.colors.Blue, borderBottom: "3px solid" }}
                    >
                        Class
                    </a>
                </HStack>
            ) : null}
            <br></br>
            <HStack spacing={4} alignSelf="start">
                <VStack spacing={2} mx={8}>
                    <UploadField name="Cover Photo" value={image} setValue={setImage}></UploadField>
                </VStack>
                <Box w="100%" style={{ marginLeft: 25, marginRight: 25 }}>
                    <HStack spacing={8} alignSelf="start">
                        <TextField
                            name={"Class Name"}
                            value={className}
                            setValue={setClassName}
                            placeholder={"Singing Monkeys"}
                            edit={EDIT}
                        ></TextField>
                        <SelectField
                            name="Associated Program"
                            options={programs?.map((program) => program.name)}
                            value={associatedProgram}
                            setValue={setAssociatedProgram}
                            edit={EDIT}
                        ></SelectField>
                    </HStack>
                    <br></br>
                    <br></br>
                    <HStack spacing={8} alignSelf="start">
                        <SelectField
                            name={"Teacher"}
                            value={teacherName}
                            options={teachers?.map((user) => user.firstName + " " + user.lastName)}
                            setValue={setTeacherName}
                            edit={EDIT}
                        ></SelectField>
                        <DateField
                            name={"Start Date and Time"}
                            value={startDate}
                            setValue={setStartDate}
                            edit={EDIT}
                            time={true}
                        />
                        <TextField
                            name={"Duration (minutes)"}
                            value={durationMinutes}
                            setValue={setDurationMinutes}
                            placeholder={"30"}
                            edit={EDIT}
                            number={true}
                        ></TextField>
                    </HStack>
                    <br></br>
                    <br></br>
                </Box>
            </HStack>
            <br></br>
            <Box style={{ marginLeft: 25, marginRight: 25 }}>
                <HStack spacing={8} alignSelf="start">
                    <SelectField
                        name="Repeat On"
                        options={Object.keys(weekday)}
                        value={repeatOn}
                        setValue={setRepeatOn}
                        edit={EDIT}
                    ></SelectField>
                    <DateField
                        name={"End Date"}
                        value={endDate}
                        setValue={setEndDate}
                        edit={EDIT}
                    />
                    <TextField
                        name={"Price ($)"}
                        value={price}
                        setValue={setPrice}
                        placeholder={"5"}
                        edit={EDIT}
                        number={true}
                    ></TextField>
                </HStack>
                <br></br>
                <br></br>
                <HStack spacing={8} alignSelf="start">
                    <TextField
                        name={"Age Requirement (years)"}
                        value={age}
                        setValue={setAge}
                        placeholder={"5"}
                        edit={EDIT}
                        number={true}
                    ></TextField>
                    <SelectField
                        name="and"
                        options={["Above", "Under"]}
                        value={aboveUnder}
                        setValue={setAboveUnder}
                        edit={EDIT}
                    ></SelectField>
                    <TextField
                        name={"Max Capacity"}
                        value={maxCapacity}
                        setValue={setMaxCapacity}
                        placeholder={"5"}
                        edit={EDIT}
                        number={true}
                    ></TextField>
                    <TextField
                        name={"Volunteer Capacity"}
                        value={volunteerCapacity}
                        setValue={setVolunteerCapacity}
                        placeholder={"5"}
                        edit={EDIT}
                        number={true}
                    ></TextField>
                </HStack>
                <br></br>
                <br></br>
                <MultipleTextField
                    name={"Class Description"}
                    value={classDescription}
                    setValue={setClassDescription}
                    longAnswer={true}
                    edit={EDIT}
                    placeholder={"Type Here"}
                ></MultipleTextField>
                <CheckBoxField
                    name="Archived"
                    value={isArchived}
                    setValue={setIsArchived}
                    required={false}
                    edit={EDIT}
                ></CheckBoxField>
                {EDIT ? (
                    <Button
                        key={className} //When loading from localstorage finishes this causes the button to re-render
                        id="Submit"
                        bg={colourTheme.colors.Blue}
                        color={"white"}
                        fontWeight="400"
                        my={8}
                        px={12}
                        borderRadius={6}
                        mt={8}
                        disabled={
                            !className ||
                            !associatedProgram ||
                            !teacherName ||
                            !startDate ||
                            !endDate ||
                            !repeatOn ||
                            !age ||
                            !aboveUnder ||
                            !maxCapacity ||
                            !volunteerCapacity ||
                            !price ||
                            !classDescription
                        }
                        onClick={() => setSaveModalOpen(true)}
                    >
                        {id === -1 ? "Create Class" : "Update Class"}
                    </Button>
                ) : null}
            </Box>
            <AdminModal
                isOpen={saveModalOpen}
                onClose={() => setSaveModalOpen(false)}
                onProceed={save}
                header={
                    id === -1
                        ? `Are you sure you want to create a new class?`
                        : `Are you sure you want to edit ${className}`
                }
                body={
                    id === -1
                        ? "You can always edit the class you have created in the classes page."
                        : ""
                }
            />
        </Wrapper>
    );
}

/**
 * getServerSideProps gets the session before this page is rendered
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    // obtain the next auth session
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    } else if (!isAdmin(session)) {
        return {
            redirect: {
                destination: "/no-access",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
};
