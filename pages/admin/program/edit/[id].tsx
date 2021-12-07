import Wrapper from "@components/AdminWrapper";
import colourTheme from "@styles/colours";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";
import { DateField } from "@components/formFields/DateField";
import { TextField } from "@components/formFields/TextField";
import { SelectField } from "@components/formFields/SelectField";
import { UploadField } from "@components/formFields/UploadField";
import { MultipleTextField } from "@components/formFields/MuitipleTextField";
import { CheckBoxField } from "@components/formFields/CheckBoxField";
import "react-datepicker/dist/react-datepicker.css";
import { AdminHeader } from "@components/admin/AdminHeader";
import { AdminModal } from "@components/admin/AdminModal";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { locale, programFormat } from ".prisma/client";
import { infoToastOptions, errorToastOptions } from "@utils/toast/options";
import { useRouter } from "next/router";
import useProgramIncludeArchived from "@utils/hooks/useProgramIncludeArchived";
import { isAdmin } from "@utils/session/authorization";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { AdminLoading } from "@components/AdminLoading";

type Props = {
    session: Session;
    edit: boolean;
};

// TODO: When changing archive, the backend should use updateProgramArchive instead of just changing the raw column value
export default function CreateProgram({ session, edit = true }: Props): JSX.Element {
    const toast = useToast();
    const router = useRouter();

    const EDIT = edit;

    const [saveModalOpen, setSaveModalOpen] = useState(false);
    const sortedLocale = Object.keys(locale).sort();

    const [id, setId] = useState(-1);
    const [image, setImage] = useState("https://via.placeholder.com/350x175?text=Cover%20Photo");
    const [programName, setProgramName] = useState("");
    const [programTag, setProgramTag] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [programDescription, setProgramDescription] = useState(
        Array(sortedLocale.length).join(".").split("."),
    );
    const [location, setLocation] = useState("");
    const [isArchived, setIsArchived] = useState(false);
    const [isProgramLoad, setIsProgramLoad] = useState(false);

    const { program, isLoading, mutate } = useProgramIncludeArchived(
        parseInt(router.query.id as string),
        locale.en,
    );

    useEffect(() => {
        if (program && !isProgramLoad) {
            setProgramName(program.name);

            //update program descriptions
            setProgramDescription([
                ...program.translations?.map((translation) => translation.description),
            ]);
            setProgramTag(program.tag);
            setStartDate(program.startDate.toString());
            setEndDate(program.endDate.toString());
            setImage(program.image);
            setId(program.id);
            setIsArchived(program.isArchived);
            setLocation(program.onlineFormat);
            setIsProgramLoad(true);
        }
    }, [program]);

    async function save() {
        const programData = {
            onlineFormat: location,
            tag: programTag,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            imageLink: image,
            isArchived: isArchived,
            id: id, //If id === -1 then a new program will be created
        };

        //Create an array of translation objects from the name and description
        const translationData = [];
        programDescription.forEach((description, index) => {
            if (description.length !== 0) {
                translationData.push({
                    name: programName,
                    description,
                    language: sortedLocale[index],
                });
            }
        });

        //Put the data into one object
        const data = {
            programData,
            translationData,
        };

        //Save to database
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        const response = await fetch("/api/program", request);
        if (response.ok) {
            mutate();
            if (id !== -1) {
                toast(
                    infoToastOptions(
                        "Program Edited",
                        `${programName} has been successfully edited!`,
                    ),
                );
                router.push(`/admin/program`);
            } else {
                toast(
                    infoToastOptions(
                        "Program Created",
                        `${programName} has been successfully added! This can be monitored and edited in Programs.`,
                    ),
                );
                localStorage.clear();
                router.push(`/admin`);
            }
        } else {
            errorToastOptions("Failed to create program", response.statusText);
        }
    }

    if (isLoading) {
        return <AdminLoading />;
    }

    return (
        <Wrapper session={session}>
            <AdminHeader>{id === -1 ? "Create" : "Edit"}</AdminHeader>
            {id === -1 ? (
                <HStack spacing={8} alignSelf="start" style={{ margin: 25, marginLeft: 50 }}>
                    <a
                        href="/admin/program/edit/new"
                        style={{ color: colourTheme.colors.Blue, borderBottom: "3px solid" }}
                    >
                        Program
                    </a>
                    <a href="/admin/class/edit/new">Class</a>
                </HStack>
            ) : null}
            <br></br>
            <HStack spacing={4} alignSelf="start">
                <VStack spacing={2} mx={8}>
                    <UploadField
                        name="Cover Photo"
                        isLarge={true}
                        value={image}
                        setValue={setImage}
                    ></UploadField>
                </VStack>
                <Box w="100%" style={{ marginLeft: 25, marginRight: 25 }}>
                    <TextField
                        name={"Program Name"}
                        value={programName}
                        setValue={setProgramName}
                        placeholder={"Building Bridges with Music"}
                        edit={EDIT}
                    ></TextField>
                    <br></br>
                    <br></br>
                    <HStack spacing={8} alignSelf="start">
                        <SelectField
                            name="Program Tags"
                            options={["Music", "Arts", "Virtual Reality", "Drama"]}
                            value={programTag}
                            setValue={setProgramTag}
                            edit={EDIT}
                        ></SelectField>
                        <SelectField
                            name="Location"
                            options={Object.keys(programFormat)}
                            value={location}
                            setValue={setLocation}
                            edit={EDIT}
                        ></SelectField>
                    </HStack>
                    <br></br>
                    <br></br>
                    <HStack spacing={8} alignSelf="start">
                        <DateField
                            name={"Start Date"}
                            value={startDate}
                            setValue={setStartDate}
                            edit={EDIT}
                        />
                        <DateField
                            name={"End Date"}
                            value={endDate}
                            setValue={setEndDate}
                            edit={EDIT}
                        />
                    </HStack>
                    <br></br>
                </Box>
            </HStack>
            <br></br>
            <Box style={{ marginLeft: 25, marginRight: 25 }}>
                <MultipleTextField
                    name={"Program Description"}
                    value={programDescription}
                    setValue={setProgramDescription}
                    longAnswer={true}
                    edit={EDIT}
                    placeholder={"Type Here"}
                ></MultipleTextField>
                <CheckBoxField
                    name="Archived "
                    value={isArchived}
                    setValue={setIsArchived}
                    required={false}
                    edit={EDIT}
                ></CheckBoxField>
                {EDIT ? (
                    <Button
                        key={programName} //When loading from localstorage finishes this causes the button to re-render
                        id="Submit"
                        bg={colourTheme.colors.Blue}
                        color={"white"}
                        fontWeight="400"
                        my={8}
                        px={12}
                        borderRadius={6}
                        mt={8}
                        disabled={
                            !programName ||
                            !programDescription ||
                            !startDate ||
                            !endDate ||
                            !programTag ||
                            !image ||
                            !location
                        }
                        onClick={() => setSaveModalOpen(true)}
                    >
                        {id === -1 ? "Create Program" : "Update Program"}
                    </Button>
                ) : null}
            </Box>
            <AdminModal
                isOpen={saveModalOpen}
                onClose={() => setSaveModalOpen(false)}
                onProceed={save}
                header={
                    id === -1
                        ? `Are you sure you want to create a new program?`
                        : `Are you sure you want to edit ${programName}`
                }
                body={
                    id === -1
                        ? "You can always edit the program you have created in the Programs page."
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
