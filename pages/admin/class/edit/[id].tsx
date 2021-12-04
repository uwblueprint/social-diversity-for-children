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
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { locale } from ".prisma/client";
import { MultipleTextField } from "@components/formFields/MuitipleTextField";
import { infoToastOptions, errorToastOptions } from "@utils/toast/options";
import { useRouter } from "next/router";
import { AdminModal } from "@components/admin/AdminModal";
import { weekday } from "@prisma/client";
import moment from "moment";

type Props = {
    session: Session;
};

export default function CreateClass({ session }: Props): JSX.Element {
    const toast = useToast();
    const router = useRouter();

    const EDIT = true;

    const [saveModalOpen, setSaveModalOpen] = useState(false);
    const [programs, setPrograms] = useState([]);
    const sortedLocale = Object.keys(locale).sort();

    const { teachers, isLoading: isUsersLoading, error: usersError } = useUsers();

    const [id, setId] = useState(-1);
    const [image, setImage] = useState("https://via.placeholder.com/200x175?text=Cover%20Photo");

    const [className, setClassName] = useState("");
    const [associatedProgram, setAssociatedProgram] = useState("");

    const [teacherName, setTeacherName] = useState("");
    const [durationMinutes, setDurationMinutes] = useState("");

    const [location, setLocation] = useState("");
    const [locationDescription, setLocationDescription] = useState("");

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

    const loadPrograms = async () => {
        const request = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        const response = await fetch("/api/program", request).then((res) => res.json());

        setPrograms(response.data);
    };

    //Get a class by id
    const getClass = async (id) => {
        const request = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(`/api/class/${id}`, request).then((res) => res.json());

        //If the class exists load the values
        if (!response.error) {
            const data = response.data;

            setClassName(data.classTranslation[0].name);
            setAssociatedProgram(data.program?.programTranslation[0]?.name);

            //update class descriptions
            setClassDescription([
                ...data.classTranslation.map((translation) => translation.description),
            ]);

            setStartDate(data.startDate);
            setEndDate(data.endDate);
            setImage(data.imageLink);
            setId(data.id);
            setIsArchived(data.isArchived);
            setRepeatOn(data.weekday);
            setAge(data.borderAge);
            setAboveUnder(data.isAgeMinimal ? "Under" : "Above");
            setMaxCapacity(data.spaceTotal);
            setVolunteerCapacity(data.volunteerSpaceTotal);
            setStripeId(data.stripePriceId);
        }
    };

    useEffect(() => {
        loadPrograms();
        getClass(router.query.id);
    }, [router.query]);

    async function save() {
        const classData = {
            programId: programs.find(
                (program) => program.programTranslation[0].name === associatedProgram,
            ).id,
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
            startTimeMinutes: moment(startDate).diff(moment().startOf("day"), "minutes"),
            durationMinutes: durationMinutes,

            //TODO: EDIT SCHEMA TO INCLUDE THESE FIELDS
            //location,
            //locationDescription,
            //teacherName, //similar to programId (search through teachers given "firstName + lastName" and find id)
        };

        //Create an array of translation objects from the name and description
        const translationData = [];
        classDescription.forEach((description, index) => {
            if (description.length !== 0) {
                translationData.push({
                    name: className,
                    description,
                    language: sortedLocale[index],
                });
            }
        });

        const data = {
            classInput: classData,
            classTranslationInput: translationData,
        };
        //Save to database
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        const response = await fetch("/api/class", request);
        const programId = programs.find(
            (program) => program.programTranslation[0].name === associatedProgram,
        ).id;

        if (response.ok) {
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
                            options={programs?.map((program) => program.programTranslation[0].name)}
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
                        ></TextField>
                    </HStack>
                    <br></br>
                    <br></br>
                    <HStack spacing={8} alignSelf="start">
                        <SelectField
                            name="Location"
                            options={["Online", "In-Person"]}
                            value={location}
                            setValue={setLocation}
                            edit={EDIT}
                        ></SelectField>
                        <TextField
                            name={""}
                            value={locationDescription}
                            setValue={setLocationDescription}
                            placeholder={"Description"}
                            edit={EDIT}
                        ></TextField>
                    </HStack>
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
                    ></TextField>
                    <TextField
                        name={"Volunteer Capacity"}
                        value={volunteerCapacity}
                        setValue={setVolunteerCapacity}
                        placeholder={"5"}
                        edit={EDIT}
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
                        key={className + location} //When loading from localstorage finishes this causes the button to re-render
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
                            !location ||
                            !startDate ||
                            !endDate ||
                            !locationDescription ||
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
