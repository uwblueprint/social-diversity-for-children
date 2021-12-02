import useLocalStorage from "@utils/hooks/useLocalStorage";
import Wrapper from "@components/AdminWrapper";
import colourTheme from "@styles/colours";
import { Box, Heading, HStack, VStack } from "@chakra-ui/layout";
import { Image, Button, Input } from "@chakra-ui/react";
import { DateField } from "@components/formFields/DateField";
import { TextField } from "@components/formFields/TextField";
import { SelectField } from "@components/formFields/SelectField";
import { UploadField } from "@components/formFields/UploadField";
import "react-datepicker/dist/react-datepicker.css";
import { getPresignedPostForUpload } from "@aws/s3";
import { AdminHeader } from "@components/admin/AdminHeader";

import { Session } from "next-auth";

type Props = {
    session: Session;
};

export default function CreateProgram({ session }: Props): JSX.Element {
    const EDIT = true;

    const [image, setImage] = useLocalStorage(
        "programImage",
        "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
    );
    const [programName, setProgramName] = useLocalStorage("programName", "");
    const [programTag, setProgramTag] = useLocalStorage("programTags", "");
    const [dateAvailable, setDateAvailable] = useLocalStorage("dateAvailable", "");
    const [startDate, setStartDate] = useLocalStorage("startDate", "");
    const [endDate, setEndDate] = useLocalStorage("endDate", "");
    const [programDescription, setProgramDescription] = useLocalStorage("programDescription", "");

    async function save() {
        const data = {
            name: programName,
            tag: programTag,
            startDate,
            endDate,
            availableDate: dateAvailable,
            description: programDescription,
            imageLink: image,
        };
        //Save to database
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        const response = await fetch("/api/program", request);
        //TODO: handle error?
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
                <TextField
                    name={"Program Description"}
                    value={programDescription}
                    setValue={setProgramDescription}
                    longAnswer={true}
                    edit={EDIT}
                    placeholder={"Type Here"}
                ></TextField>
                {EDIT ? (
                    <Button
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
                        onClick={save}
                    >
                        {"Create Program"}
                    </Button>
                ) : null}
            </Box>
        </Wrapper>
    );
}
