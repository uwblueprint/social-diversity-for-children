import useLocalStorage from "@utils/hooks/useLocalStorage";
import Wrapper from "@components/AdminWrapper";
import moment from "moment";

import {
    Box,
    Heading,
    HStack,
    Link as ChakraLink,
    Text,
    VStack,
} from "@chakra-ui/layout";
import { Image, Button } from "@chakra-ui/react";
import { border } from "@chakra-ui/styled-system";

//type Props = {};

export default function CreateClass(): JSX.Element {
    const [programName, setProgramName] = useLocalStorage("programName", "");
    const [programTags, setProgramTags] = useLocalStorage("programTags", []);
    const [startDate, setStartDate] = useLocalStorage("startDate", moment());
    const [EndDate, setEndDate] = useLocalStorage("endDate", moment());
    const [programDescription, setProgramDescription] = useLocalStorage(
        "programDescription",
        "",
    );

    return (
        <Wrapper>
            <Box style={{ margin: 25 }}>
                <VStack spacing={6} mx={8}>
                    <Box
                        style={{
                            borderBottom: "2px solid lightgray",
                            float: "left",
                        }}
                    >
                        <Heading
                            alignSelf="flex-start"
                            fontWeight={700}
                            fontSize={22}
                        >
                            Create
                        </Heading>
                    </Box>
                    <HStack spacing={4} alignSelf="start">
                        <a href="/admin/create-program">Program</a>
                        <a href="/admin/create-class">Class</a>
                    </HStack>
                    <br></br>
                    <HStack spacing={4} alignSelf="start">
                        <VStack spacing={6} mx={8}>
                            <Image
                                boxSize="215px" //TODO: Figure out how to set width/length seperately
                                htmlHeight="700px"
                                objectFit="cover"
                                src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
                                alt="Segun Adebayo"
                            />
                            <Button fontWeight="400" px={20} borderRadius={6}>
                                <p>Upload</p>
                            </Button>
                        </VStack>
                        <a href="/admin/create-class">Class</a>
                    </HStack>
                </VStack>
            </Box>
        </Wrapper>
    );
}
