import useLocalStorage from "@utils/hooks/useLocalStorage";
import Wrapper from "@components/AdminWrapper";
import colourTheme from "@styles/colours";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { DateField } from "@components/formFields/DateField";
import { TextField } from "@components/formFields/TextField";
import { SelectField } from "@components/formFields/SelectField";
import { UploadField } from "@components/formFields/UploadField";
import { MultipleTextField } from "@components/formFields/MuitipleTextField";
import "react-datepicker/dist/react-datepicker.css";
import { AdminHeader } from "@components/admin/AdminHeader";
import { AdminModal } from "@components/admin//AdminModal";
import { useState } from "react";
import { Session } from "next-auth";
import { locale } from ".prisma/client";

type Props = {
    session: Session;
};

export default function CreateProgram({ session }: Props): JSX.Element {
    const EDIT = true;

    const [saveModalOpen, setSaveModalOpen] = useState(false);
    const sortedLocale = Object.keys(locale).sort();

    const [image, setImage] = useLocalStorage("programImage", "");
    const [programName, setProgramName] = useLocalStorage("programName", "");
    const [programTag, setProgramTag] = useLocalStorage("programTags", "");
    const [dateAvailable, setDateAvailable] = useLocalStorage("dateAvailable", "");
    const [startDate, setStartDate] = useLocalStorage("startDate", "");
    const [endDate, setEndDate] = useLocalStorage("endDate", "");
    const [programDescription, setProgramDescription] = useLocalStorage(
        "programDescription",
        Array(sortedLocale.length).join(".").split("."),
    );

    console.log(programDescription);
    async function save() {
        const programData = {
            onlineFormat: "online",
            tag: programTag,
            startDate,
            endDate,
            //availableDate: dateAvailable,
            imageLink: image,
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
    }

    // console.log(image);
    // console.log(startDate);
    // console.log(programName);
    // console.log(programTag);

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
                        {"Create Program"}
                    </Button>
                ) : null}
            </Box>
            <AdminModal
                isOpen={saveModalOpen}
                onClose={() => setSaveModalOpen(false)}
                onProceed={save}
                header={`Are you sure you want to create a new program?`}
                body="You can always edit the program you have created in the Programs page."
            />
        </Wrapper>
    );
}
