import {
    Button,
    Box,
    Center,
    Text,
    Input,
    FormControl,
    FormLabel,
    Progress,
    Stack,
    HStack,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";

/**
 * This is the page that a user will use to enter the participants personal information
 * onto the SDC platform as a parent of volunteer
 */
export default function Participantinfo(): JSX.Element {
    const [progressBar, setprogressBar] = useState(Number);
    if (progressBar <= 0) {
        setprogressBar(14);
    }
    return (
        <Center h="500px">
            <Box width="1000px">
                <Text fontWeight="700" fontSize="36px">
                    Participant Information
                </Text>
                <Stack spacing={8}>
                    <Progress value={progressBar} />
                    <HStack spacing="24px">
                        <FormControl id="first-name">
                            <FormLabel>First name</FormLabel>
                            <Input placeholder="First name" />
                        </FormControl>
                        <FormControl id="last-name">
                            <FormLabel>Last name</FormLabel>
                            <Input placeholder="Last name" />
                        </FormControl>
                    </HStack>
                    <FormControl id="date-of-birth">
                        <FormLabel>Date Of Birth</FormLabel>
                        <Input placeholder="Date Of Birth" />
                    </FormControl>
                    <FormControl id="street-address">
                        <FormLabel>Street Address</FormLabel>
                        <Input placeholder="Street Address" />
                    </FormControl>
                    <HStack spacing="24px">
                        <FormControl id="postal-code">
                            <FormLabel>Postal Code</FormLabel>
                            <Input placeholder="Postal Code" />
                        </FormControl>
                        <FormControl id="city">
                            <FormLabel>City</FormLabel>
                            <Input placeholder="City" />
                        </FormControl>
                        <FormControl id="province">
                            <FormLabel>Province</FormLabel>
                            <Input placeholder="Province" />
                        </FormControl>
                    </HStack>
                    <FormControl id="school">
                        <FormLabel>School (if applicable)</FormLabel>
                        <Input placeholder="School (if applicable)" />
                    </FormControl>
                    <FormControl id="grade">
                        <FormLabel>Grade (if applicable)</FormLabel>
                        <Input placeholder="Grade (if applicable)" />
                    </FormControl>
                    <Button
                        backgroundColor="brand.500"
                        color="brand.100"
                        width="366px"
                        height="44px"
                        fontSize="14px"
                        fontWeight="400"
                        mt="20px"
                    >
                        Next
                    </Button>
                </Stack>
            </Box>
        </Center>
    );
}
