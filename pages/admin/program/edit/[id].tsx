import useLocalStorage from "@utils/hooks/useLocalStorage";
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
import { locale } from ".prisma/client";
import { infoToastOptions } from "@utils/toast/options";
import { useRouter } from "next/router";

type Props = {
    session: Session;
    edit: boolean;
};

//TODO: For editing programs, replace the  default values with the values from the program
export default function CreateProgram({ session, edit = true }: Props): JSX.Element {
    const toast = useToast();
    const router = useRouter();

    console.log(router.query);

    //Get a program by id
    const getProgram = async (id) => {
        const request = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(`/api/program/${id}`, request).then((res) => res.json());
        console.log(response);

        //If the program exists load the values
        if (!response.error) {
            console.log("Data good!");
            const data = response.data;
            setProgramName(data.programTranslation[0].name);
            setProgramDescription([
                ...data.programTranslation.map((translation) => translation.description),
            ]);
            setProgramTag(data.tag);
            setStartDate(data.startDate);
            setEndDate(data.endDate);
            setImage(data.imageLink);
            setId(data.id);
            setIsArchived(data.isArchived);
        }
    };

    console.log(router.query.id);

    const EDIT = edit;

    const [saveModalOpen, setSaveModalOpen] = useState(false);
    const sortedLocale = Object.keys(locale).sort();

    const [id, setId] = useState(-1);
    const [image, setImage] = useLocalStorage(
        "programImage",
        "https://www.digitalcitizen.life/wp-content/uploads/2020/10/photo_gallery.jpg",
    );
    const [programName, setProgramName] = useState("");
    const [programTag, setProgramTag] = useState("");
    const [dateAvailable, setDateAvailable] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [programDescription, setProgramDescription] = useState(
        Array(sortedLocale.length).join(".").split("."),
    );
    const [isArchived, setIsArchived] = useState(false);

    useEffect(() => {
        getProgram(router.query.id);
    }, [router.query]);

    async function save() {
        const programData = {
            onlineFormat: "online",
            tag: programTag,
            startDate,
            endDate,
            //availableDate: dateAvailable,
            imageLink: image,
            isArchived: isArchived,
            id,
        };

        //If the program id exists we want to update instead of create a new one
        //If id === -1 then a new program will be created
        if (id !== -1) {
            programData["id"] = id;
        }

        //Create an array of translation objects from the name and description
        const translationData = [];
        programDescription.forEach((description, index) => {
            if (description.length !== 0) {
                translationData.push({
                    name: programName,
                    description,
                    language: sortedLocale[index],
                    programId: id,
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
        console.log(response);
        if (response.ok) {
            console.log(response);
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
            alert("Failed to create program");
        }
    }

    return (
        <Wrapper session={session}>
            <AdminHeader>Create</AdminHeader>
            <HStack spacing={8} alignSelf="start" style={{ margin: 25, marginLeft: 50 }}>
                <a
                    href="/admin/create-program"
                    style={{ color: colourTheme.colors.Blue, borderBottom: "3px solid" }}
                >
                    Program
                </a>
                <a href="/admin/create-class">Class</a>
            </HStack>
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
                        <DateField
                            name={"DateSignup"}
                            value={dateAvailable}
                            setValue={setDateAvailable}
                            edit={EDIT}
                        />
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
                            !dateAvailable ||
                            !programTag ||
                            !image
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
