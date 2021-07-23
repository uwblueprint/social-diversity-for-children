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

const FormButton = (props) => {
    return (
        <Button
            backgroundColor="brand.500"
            color="brand.100"
            width="366px"
            height="44px"
            fontSize="14px"
            fontWeight="400"
            mt="20px"
            onClick={props.onClick}
        >
            {props.children}
        </Button>
    );
};

/**
 * This is the page that a user will use to enter the participants personal information
 * onto the SDC platform as a parent of volunteer
 */
export default function Participantinfo(): JSX.Element {
    const [progressBar, setprogressBar] = useState(Number);
    const [pageNum, setPageNum] = useState(0);
    const totalPages = 7;
    const progressBarIncrement = Math.floor(100 / totalPages);
    if (progressBar <= 0) {
        setprogressBar(progressBarIncrement);
    }
    const getProgressBarValue = (pageNum) =>
        progressBarIncrement * (pageNum + 1);
    const getFormButton = () => {
        if (pageNum === totalPages) {
            return;
        } else if (pageNum === totalPages - 1) {
            return (
                <FormButton
                    onClick={() => setPageNum((prevPage) => prevPage + 1)}
                >
                    Finish
                </FormButton>
            );
        }
        return (
            <FormButton onClick={() => setPageNum((prevPage) => prevPage + 1)}>
                Next
            </FormButton>
        );
    };

    const formPages = [
        <Stack spacing={8}>
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
        </Stack>,
        <Stack spacing={8}>
            <Text>Sample page 2 - add form fields</Text>
        </Stack>,
        <Stack spacing={8}>
            <Text>Sample page 3 - add form fields</Text>
        </Stack>,
        <Stack spacing={8}>
            <Text>Sample page 4 - add form fields</Text>
        </Stack>,
        <Stack spacing={8}>
            <Text>Sample page 5 - add form fields</Text>
        </Stack>,
        <Stack spacing={8}>
            <Text>Sample page 6 - add form fields</Text>
        </Stack>,
        <Stack spacing={8}>
            <Text>Sample page 7 - add form fields</Text>
        </Stack>,
        <Stack spacing={8}>
            <Text>Done!</Text>
        </Stack>,
    ];

    return (
        <Center>
            <Box>
                <Button
                    onClick={() =>
                        setPageNum((prevPage) => Math.max(prevPage - 1, 0))
                    }
                >
                    Back
                </Button>
                <Text fontWeight="700" fontSize="36px">
                    Participant Information
                </Text>
                <Stack spacing={8}>
                    <Progress
                        value={getProgressBarValue(pageNum)}
                        size="sm"
                        colorScheme="blackAlpha"
                    />
                    {formPages[pageNum]}
                    {getFormButton()}
                </Stack>
            </Box>
        </Center>
    );
}
