import useLocalStorage from "@utils/hooks/useLocalStorage";
import Wrapper from "@components/AdminWrapper";
import colourTheme from "@styles/colours";
import { Box, Heading, HStack, Link as ChakraLink, Text, VStack } from "@chakra-ui/layout";
import { Image, Button, Input } from "@chakra-ui/react";
import { DateField } from "@components/formFields/DateField";
import { TextField } from "@components/formFields/TextField";
import { SelectField } from "@components/formFields/SelectField";
import "react-datepicker/dist/react-datepicker.css";
import { getPresignedPostForUpload } from "@aws/s3";

export default function CreateProgram(): JSX.Element {
    const EDIT = true;

    const [image, setImage] = useLocalStorage("programImage", "");
    const [programName, setProgramName] = useLocalStorage("programName", "");
    const [programTag, setProgramTag] = useLocalStorage("programTags", "");
    const [dateAvailable, setDateAvailable] = useLocalStorage("dateAvailable", "");
    const [startDate, setStartDate] = useLocalStorage("startDate", "");
    const [endDate, setEndDate] = useLocalStorage("endDate", "");
    const [programDescription, setProgramDescription] = useLocalStorage("programDescription", "");

    const upload = (value) => {
        console.log(value.target.files); //returns FILELIST array (will only be the first element)
        console.log(process.env.S3_PUBLIC_IMAGES_BUCKET);
        const post = getPresignedPostForUpload("sdc-public-images", "Test/image.jng");

        //setImage(awsurl)
    };

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
        <Wrapper>
            <Heading
                alignSelf="flex-start"
                fontWeight={700}
                fontSize={22}
                style={{ color: colourTheme.colors.Blue, margin: 25 }}
            >
                Create
            </Heading>
            <Box
                style={{
                    borderBottom: "2px solid lightgray",
                    width: "100%",
                    marginBottom: 50,
                }}
            ></Box>
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
                    <p>Cover Photo</p>
                    <Image
                        boxSize="200px" //TODO: Figure out how to set width/length seperately
                        htmlHeight="700px"
                        objectFit="cover"
                        src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
                        alt="Segun Adebayo"
                    />
                    <Input
                        id="upload"
                        type="file"
                        onChange={upload}
                        hidden
                        disabled={!EDIT}
                    ></Input>
                    <label
                        for="upload"
                        style={{
                            cursor: "pointer",
                            backgroundColor: "#E2E8F0",
                            borderRadius: 6,
                            padding: 5,
                            marginTop: 15,
                            width: 200,
                            textAlign: "center",
                        }}
                    >
                        Upload
                    </label>
                </VStack>
                <Box>
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
