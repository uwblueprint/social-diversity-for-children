import {
    Button,
    Box,
    Center,
    Flex,
    Text,
    Input,
    FormControl,
    FormLabel,
    Link,
    Progress,
    Stack,
    HStack,
    VStack,
    Select,
    Checkbox,
    Textarea,
    Heading,
    UnorderedList,
    ListItem,
    OrderedList,
} from "@chakra-ui/react";
import { ArrowBackIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

const BLUE = "#0C53A0";

const FormButton = (props) => {
    return (
        <Button
            bg={BLUE}
            color={"white"}
            fontWeight="400"
            onClick={props.onClick}
            my={8}
            px={12}
        >
            {props.children}
        </Button>
    );
};

/**
 * This is the page that a user will use to enter the participants personal information
 * onto the SDC platform as a parent of volunteer
 */
export default function ParticipantInfo(): JSX.Element {
    const [progressBar, setProgressBar] = useState(Number);
    const [pageNum, setPageNum] = useState(0);

    const totalPages = 8;
    const progressBarIncrement = Math.floor(100 / totalPages);

    if (progressBar <= 0) {
        setProgressBar(progressBarIncrement);
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
            <Box maxW="55rem">
                <Text noOfLines={2} fontSize="16px" fontWeight="400">
                    Please provide information on the participant that is being
                    registered in the program. An opportunity to add information
                    of additional participants you would like to register will
                    be provided afterwards.
                </Text>
            </Box>
            <FormLabel>
                {" "}
                Emergency Contact Name
                <HStack spacing="24px">
                    <FormControl id="first-name">
                        <Input placeholder="First name" />
                    </FormControl>
                    <FormControl id="last-name">
                        <Input placeholder="Last name" />
                    </FormControl>
                </HStack>
            </FormLabel>
            <FormControl id="date-of-birth">
                <FormLabel>Date Of Birth (YYYY-MM-DD) </FormLabel>
                <Input placeholder="Date Of Birth" />
            </FormControl>
            <FormControl id="street-address-1">
                <FormLabel>Street Address 1</FormLabel>
                <Input placeholder="249 Phillip Street" />
            </FormControl>
            <FormControl id="street-address-2">
                <FormLabel>Street Address 2</FormLabel>
                <Input placeholder="284 Phillip Street" />
            </FormControl>
            <HStack spacing="24px">
                <FormControl id="city">
                    <FormLabel>City</FormLabel>
                    <Input placeholder="Waterloo" />
                </FormControl>
                <FormControl id="province">
                    <FormLabel>Province</FormLabel>
                    <Select placeholder="Select option">
                        <option value="NL">NL</option>
                        <option value="PE">PE</option>
                        <option value="NS">NS</option>
                        <option value="NB">NB</option>
                        <option value="QC">QC</option>
                        <option value="ON">ON</option>
                        <option value="MB">MB</option>
                        <option value="SK">SK</option>
                        <option value="AB">AB</option>
                        <option value="BC">BC</option>
                        <option value="YT">YT</option>
                        <option value="NT">NT</option>
                        <option value="NU">NU</option>
                    </Select>
                </FormControl>
                <FormControl id="postal-code">
                    <FormLabel>Postal Code</FormLabel>
                    <Input placeholder="K9S 8C3" />
                </FormControl>
            </HStack>
            <FormControl id="school">
                <FormLabel>School (if applicable)</FormLabel>
                <Input placeholder="Westmount Secondary School" />
            </FormControl>
            <FormControl id="grade">
                <FormLabel>Grade (if applicable)</FormLabel>
                <Input placeholder="5" />
            </FormControl>
        </Stack>,
        <Stack spacing={8}>
            <FormControl id="participant-have">
                <FormLabel>Does the participant have:</FormLabel>
                <Stack direction="column">
                    <Checkbox>Learning difficulties</Checkbox>
                    <Checkbox>Physical difficulties</Checkbox>
                    <Checkbox>Sensory difficulties</Checkbox>
                    <Checkbox>Other</Checkbox>
                </Stack>
            </FormControl>
            <FormControl id="special-education">
                <FormLabel>
                    Is the participant currently involved in a special education
                    program at their school?
                </FormLabel>
                <Stack direction="row">
                    <Checkbox>Yes</Checkbox>
                    <Checkbox>No </Checkbox>
                </Stack>
            </FormControl>
            <FormControl id="therapy">
                <FormLabel>
                    Is the participant revieving any other form of therapy?
                </FormLabel>
                <Stack direction="column">
                    <Checkbox>Physiotherapy</Checkbox>
                    <Checkbox>Speech and Language Therapy</Checkbox>
                    <Checkbox>Occupational Therapy</Checkbox>
                    <Checkbox>Psychotherapy/Counseling</Checkbox>
                    <Checkbox>Music or Art Therapy</Checkbox>
                    <Checkbox>Other</Checkbox>
                </Stack>
            </FormControl>

            {/* TODO: change title to "Parent/Guardian Information"  */}
            <FormControl id="parent/guardian-expectations">
                <FormLabel>Parent/Guardian Expectations</FormLabel>
                <Textarea placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi mauris enim, egestas." />
            </FormControl>
        </Stack>,
        <Stack spacing={8}>
            <FormLabel>
                {" "}
                Parent/Guardian Name
                <HStack spacing="24px">
                    <FormControl id="first-name">
                        <Input placeholder="First name" />
                    </FormControl>
                    <FormControl id="last-name">
                        <Input placeholder="Last name" />
                    </FormControl>
                </HStack>
            </FormLabel>
            <FormControl id="phone-number">
                <FormLabel>Phone Number </FormLabel>
                <Input placeholder="289 349 1048" />
            </FormControl>
            <FormControl id="relationship-to-participant">
                <FormLabel>Relationship to Participant</FormLabel>
                <Input placeholder="Mother" />
            </FormControl>
        </Stack>,

        // TODO: Change title to "Participant Emergency Form"
        <Stack spacing={8}>
            <Box maxW="55rem">
                <Text noOfLines={3} fontSize="16px" fontWeight="400">
                    The information on this form will be used at the discretion
                    of the activity instructor/coordinator to ensure care and
                    attention is given to the safety and health of your child.
                    All information on this form is considered Personal and
                    Confidential. The contact listed on the emergency form
                    cannot be the same contact listed as the parent above.
                </Text>
            </Box>
            <FormLabel>
                {" "}
                Emergency Contact Name
                <HStack spacing="24px">
                    <FormControl id="first-name">
                        <Input placeholder="First name" />
                    </FormControl>
                    <FormControl id="last-name">
                        <Input placeholder="Last name" />
                    </FormControl>
                </HStack>
            </FormLabel>
            <FormControl id="emergency-contact-cell-number">
                <FormLabel>Emergency Contact Cell Number </FormLabel>
                <Input placeholder="289 349 1048" />
            </FormControl>
            <FormControl id="relationship-to-participant">
                <FormLabel>Relationship to Participant</FormLabel>
                <Input placeholder="Mother" />
            </FormControl>
        </Stack>,

        // TODO: Change title to "Participant Health Form"
        <Stack spacing={8}>
            <Box maxW="55rem">
                <Text noOfLines={3} fontSize="16px" fontWeight="400">
                    The information on this form will be used at the discretion
                    of the activity instructor/coordinator to ensure care and
                    attention is given to the safety and health of your child.
                    All information on this form is considered Personal and
                    Confidential. The contact listed on the emergency form
                    cannot be the same contact listed as the parent above.
                </Text>
            </Box>
            <FormControl id="medication">
                <FormLabel>Is your child on medication?</FormLabel>
                <Stack direction="row">
                    <Checkbox>Yes</Checkbox>
                    <Checkbox>No </Checkbox>
                </Stack>
            </FormControl>
            {/* TODO: Make pop up if yes is selected */}
            <FormControl id="details">
                <FormLabel>Please provide any details if necessary </FormLabel>
                <Input placeholder="Details" />
            </FormControl>
            <FormControl id="medication">
                <FormLabel>Does your child have any allergies?</FormLabel>
                <Stack direction="row">
                    <Checkbox>Yes</Checkbox>
                    <Checkbox>No </Checkbox>
                </Stack>
            </FormControl>
        </Stack>,
        // TODO: change title to "Confirm Participant(s) and add the participant names? "
        <Stack spacing={8}>
            <Box maxW="55rem">
                <Text
                    noOfLines={2}
                    fontSize="16px"
                    fontWeight="400"
                    align="center"
                >
                    Add information of additional participants you would like to
                    register in programs. You can always edit or add additional
                    participants later within ‘My Account’.
                </Text>
            </Box>
        </Stack>,
        // TODO: change title to "Proof of Income"
        <Stack spacing={8}>
            <Box maxW="55rem">
                <Text margin="10px" fontSize="16px" fontWeight="400">
                    Upload a Proof of Income to recieve automated discounts on
                    classes you take!
                </Text>
                <Heading fontSize="22px">
                    Example of Proof of income include
                    <UnorderedList
                        margin="10px"
                        fontSize="16px"
                        fontWeight="400"
                    >
                        <ListItem>Income tax notice</ListItem>
                        <ListItem>Paystub</ListItem>
                        <ListItem>etc</ListItem>
                    </UnorderedList>
                </Heading>
                <Heading fontSize="22px">
                    Uploading your Proof of Income
                    <OrderedList margin="10px" fontSize="16px" fontWeight="400">
                        <ListItem>
                            Navigate to My Account, Proof of Income
                        </ListItem>
                        <ListItem>
                            Upload a copy of the result to your SDC account
                        </ListItem>
                        <ListItem>
                            Once you’ve submitted your proof of income, keep an
                            eye out for approval status from SDC!
                        </ListItem>
                        <ListItem>
                            Upon approval, discounts will automatically applied
                            to your account! Check your account for details on
                            the amount of discount you have been approved for
                        </ListItem>
                    </OrderedList>
                </Heading>
                <FormButton>Upload Proof of Income</FormButton>
                {/* add skip for now button instead of next */}
            </Box>
        </Stack>,
        // TODO: change title to "How did you hear about us?"
        <Stack spacing={8}>
            <FormControl id="hear-about-us">
                <FormLabel>How did you hear about our programs?</FormLabel>
                <Stack direction="column">
                    <Checkbox>Friends and Family </Checkbox>
                    <Checkbox>Flyers</Checkbox>
                    <Checkbox>Email</Checkbox>
                    <Checkbox>Social Media</Checkbox>
                    <Checkbox>Other</Checkbox>
                </Stack>
            </FormControl>
        </Stack>,
    ];

    return (
        <Center>
            <Box>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Button
                        onClick={() =>
                            setPageNum((prevPage) => Math.max(prevPage - 1, 0))
                        }
                        bg={"transparent"}
                        pl={0}
                    >
                        <ArrowBackIcon mr={4} />
                        Back
                    </Button>
                    <Link href={"/login"}>
                        <CloseIcon />
                    </Link>
                </Flex>
                <Text fontWeight="700" fontSize="36px">
                    Participant Information
                </Text>
                <Stack spacing={8}>
                    <Progress
                        value={getProgressBarValue(pageNum)}
                        size="sm"
                        color={BLUE}
                    />
                    {formPages[pageNum]}
                </Stack>
                {getFormButton()}
            </Box>
        </Center>
    );
}
