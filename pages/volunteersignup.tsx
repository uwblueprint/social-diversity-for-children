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
    Radio,
    RadioGroup,
} from "@chakra-ui/react";
import { CloseButton } from "@components/CloseButton";
import { BackButton } from "@components/BackButton";
import { useState } from "react";
import { GetServerSideProps } from "next"; // Get server side props
import { getSession, GetSessionOptions } from "next-auth/client";
import Wrapper from "@components/SDCWrapper";
import useLocalStorage from "@utils/useLocalStorage";
import { roles, locale, province, VolunteerInput } from "@models/User";
import colourTheme from "@styles/colours";

const DEFAULT_PROVINCE = province.BC;

const FormButton = (props) => {
    return (
        <Button
            bg={colourTheme.colors.Blue}
            color={"white"}
            fontWeight="400"
            onClick={props.onClick}
            my={8}
            px={12}
            borderRadius={100}
        >
            {props.children}
        </Button>
    );
};

const FormPage = (props) => {
    return <Stack spacing={8}>{props.children}</Stack>;
};

/**
 * This is the page that a volunteer will use to enter the volunteers personal information
 * onto the SDC platform as a volunteer
 */
export default function VolunteerInfo({
    session,
}: {
    session: Record<string, unknown>;
}): JSX.Element {
    const [progressBar, setProgressBar] = useState(Number);
    const [pageNum, setPageNum] = useState(0);
    const formButtonOnClick = () => {
        setPageNum((prevPage) => prevPage + 1);
        window.scrollTo({ top: 0 });
    };

    /* Store form fields in local storage */
    //Volunteer Info

    const [volunteerFirstName, setVolunteerFirstName] = useLocalStorage(
        "volunteerFirstName",
        "",
    );
    const [volunteerLastName, setVolunteerLastName] = useLocalStorage(
        "volunteerLastName",
        "",
    );
    const [phoneNumber, setPhoneNumber] = useLocalStorage("phoneNumber", "");

    //volunteer Personal Details

    const [dateOfBirth, setDateOfBirth] = useLocalStorage("dateOfBirth", "");
    const [address1, setAddress1] = useLocalStorage("address1", "");
    const [city, setCity] = useLocalStorage("city", "");
    const [participantProvince, setParticipantProvince] =
        useState(DEFAULT_PROVINCE);
    const [postalCode, setPostalCode] = useLocalStorage("postalCode", "");
    const [school, setSchool] = useLocalStorage("school", "");

    //volunteer personal details

    const [skills, setSkills] = useLocalStorage("skills", "");
    const [heardFrom, setHeardFrom] = useLocalStorage("heardFrom", "");

    const formPageHeaders = [
        "Volunteer Information",
        "Volunteer Personal Details",
        "Volunteer Personal Details",
        "Criminal Record Check",
    ];

    const formPages = [
        <Box>
            <FormPage>
                <FormLabel>
                    Volunteer Name
                    <HStack spacing="24px">
                        <FormControl id="first-name">
                            <Input
                                placeholder="First name"
                                onChange={(e) =>
                                    setVolunteerFirstName(e.target.value)
                                }
                                value={volunteerFirstName}
                            />
                        </FormControl>
                        <FormControl id="last-name">
                            <Input
                                placeholder="Last name"
                                onChange={(e) =>
                                    setVolunteerLastName(e.target.value)
                                }
                                value={volunteerLastName}
                            />
                        </FormControl>
                    </HStack>
                </FormLabel>
                <FormControl id="Phone Number">
                    <FormLabel>Phone Number </FormLabel>
                    <Input
                        placeholder="289 349 1048"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        value={phoneNumber}
                    />
                </FormControl>
            </FormPage>
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
        </Box>,
        <Box>
            <FormPage>
                <FormControl id="date-of-birth">
                    <FormLabel>Date Of Birth (YYYY-MM-DD) </FormLabel>
                    <Input
                        placeholder="Date Of Birth"
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        value={dateOfBirth}
                    />
                </FormControl>
                <FormControl id="fifteen" isRequired>
                    {/* TODO: make mandatory before proceeding with rest of form */}
                    <Stack direction="column">
                        <Checkbox>
                            I certify that I am over the age of 15 in order to
                            volunteer with SDC
                        </Checkbox>
                    </Stack>
                </FormControl>
                <FormControl id="street-address">
                    <FormLabel>Street Address </FormLabel>
                    <Input
                        placeholder="815 Hornby St."
                        onChange={(e) => setAddress1(e.target.value)}
                        value={address1}
                    />
                </FormControl>
                <HStack spacing="24px">
                    <FormControl id="city">
                        <FormLabel>City</FormLabel>
                        <Input
                            placeholder="Vancouver"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                        />
                    </FormControl>
                    <FormControl id="province">
                        <FormLabel>Province</FormLabel>
                        <Select
                            placeholder="Select option"
                            onChange={(e) =>
                                setParticipantProvince(province[e.target.value])
                            }
                            value={participantProvince} // TODO: bug with displayed value after refresh
                        >
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
                        <Input
                            placeholder="V6Z 2E6"
                            onChange={(e) => setPostalCode(e.target.value)}
                            value={postalCode}
                        />
                    </FormControl>
                </HStack>
                <FormControl id="school">
                    <FormLabel>School (if applicable)</FormLabel>
                    <Input
                        placeholder="Westmount Secondary School"
                        onChange={(e) => setSchool(e.target.value)}
                        value={school}
                    />
                </FormControl>
            </FormPage>
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
        </Box>,
        <Box>
            <FormPage>
                <VStack>
                    <FormControl id="skills">
                        <FormLabel>
                            Skills/Experience (ex. Arts and Crafts, Music,
                            First-Aid Certificates, Teaching or Volunteering
                            Experience, Experience with Children with Special
                            Needs)
                        </FormLabel>
                        <Textarea
                            placeholder="Type here"
                            size="sm"
                            onChange={(e) => setSkills(e.target.value)}
                            value={skills}
                        ></Textarea>
                    </FormControl>
                    <FormControl id="hear-about-us">
                        <FormLabel>
                            How Did You Hear About this Volunteer Opportunity?
                        </FormLabel>
                        <Textarea
                            placeholder="Type here"
                            size="sm"
                            onChange={(e) => setHeardFrom(e.target.value)}
                            value={heardFrom}
                        ></Textarea>
                    </FormControl>
                    <FormControl id="commit">
                        {/* TODO: make mandatory before proceeding with rest of form */}
                        <Stack direction="column">
                            <Checkbox>
                                I certify that I will commit to attending all
                                volunteer sessions I sign up for
                            </Checkbox>
                        </Stack>
                    </FormControl>
                </VStack>
            </FormPage>
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
        </Box>,
        <Box>
            <FormPage>
                <Box maxW="55rem">
                    <Text margin="10px" fontSize="16px" fontWeight="200">
                        As volunteering in our programs involves working closely
                        with children and vulnerable persons, we ask that all
                        our volunteers get a Criminal Record Check completed at
                        their local police station or the RCMP office. The price
                        of the CRC will be waived with a letter provided from
                        SDC.
                    </Text>
                    <Text margin="10px" fontSize="16px" fontWeight="200">
                        Also, please note that the MPM/JELIC is an IN-PERSON
                        math program. If you apply to volunteer for this
                        program, please ensure that you are aware that it is an
                        in-person program and are able to attend the classes at
                        Richmond Quantum Academy (6650-8181 Cambie Rd, Richmond,
                        BC V6X 3X9).
                    </Text>
                    <Heading fontSize="22px">
                        Uploading your Criminal Record Check
                        <OrderedList
                            margin="10px"
                            fontSize="16px"
                            fontWeight="400"
                        >
                            <ListItem>
                                Under My Account, then Criminal Record Check
                                generates a volunteer letter from SDC
                            </ListItem>
                            <ListItem>
                                Use the provided letter to obtain a criminal
                                record check at the local police station or RCMP
                                office
                            </ListItem>
                            <ListItem>
                                Upload a copy of the document to your SDC
                                account
                            </ListItem>
                            <ListItem>
                                Once you’ve submitted your document(s), keep an
                                eye out for the approval status from SDC!
                            </ListItem>
                        </OrderedList>
                    </Heading>
                </Box>
            </FormPage>
            <Box>
                <HStack spacing="24px">
                    <FormButton>Upload Criminal Record Check</FormButton>
                    <Button
                        variant="ghost"
                        as="u"
                        onClick={() => {
                            setPageNum((prevPage) => prevPage + 1);
                            updateUserAndClearForm();
                        }}
                        borderRadius={100}
                    >
                        Skip for Now
                    </Button>
                </HStack>
            </Box>
        </Box>,
    ];

    const totalPages = formPages.length;
    const progressBarIncrement = Math.ceil(100 / totalPages);

    if (progressBar <= 0) {
        setProgressBar(progressBarIncrement);
    }

    const getProgressBarValue = (pageNum) =>
        progressBarIncrement * (pageNum + 1);

    async function updateUser() {
        const volunteerData: VolunteerInput = {
            dateOfBirth: new Date(dateOfBirth),
            phoneNumber: phoneNumber,
            criminalRecordCheckLink: undefined,
            addressLine1: address1,
            postalCode: postalCode,
            cityName: city,
            province: participantProvince,
            preferredLanguage: locale.en,
            school: school,
            skills: skills,
            hearAboutUs: heardFrom,
        };

        const userData = {
            firstName: volunteerFirstName,
            lastName: volunteerLastName,
            role: roles.VOLUNTEER,
            roleData: volunteerData,
        };
        const request = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        };
        const response = await fetch("api/user", request);
        const updatedUserData = await response.json();
        return updatedUserData;
    }

    const clearLocalStorage = () => {
        setVolunteerFirstName("");
        setVolunteerLastName("");
        setPhoneNumber("");
        setDateOfBirth("");
        setAddress1("");
        setCity("");
        setParticipantProvince(DEFAULT_PROVINCE);
        setPostalCode("");
        setSchool("");
        setSkills("");
        setHeardFrom("");
    };
    async function updateUserAndClearForm() {
        const updatedUser = await updateUser();
        if (updatedUser) {
            clearLocalStorage();
            return updatedUser;
        } else {
            return null;
        }
    }

    return (
        <Wrapper session={session}>
            {pageNum < totalPages ? (
                <Center>
                    <Box w={912}>
                        <Flex
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            <BackButton
                                onClick={
                                    pageNum > 0
                                        ? () =>
                                              setPageNum((prevPage) =>
                                                  Math.max(prevPage - 1, 0),
                                              )
                                        : null
                                }
                            />
                            <CloseButton />
                        </Flex>
                        <Text fontWeight="700" fontSize="36px">
                            {formPageHeaders[pageNum]}
                        </Text>
                        <Stack spacing={8}>
                            <Progress
                                value={getProgressBarValue(pageNum)}
                                size="sm"
                                color={colourTheme.colors.Blue}
                                mt={8}
                                mb={6}
                            />
                            {formPages.map((formPage, idx) => {
                                return (
                                    <Box
                                        key={idx}
                                        display={
                                            pageNum === idx ? null : "none"
                                        }
                                    >
                                        {formPage}
                                    </Box>
                                );
                            })}
                        </Stack>
                    </Box>
                </Center>
            ) : (
                <Center>
                    <VStack mt={120} mb={180} spacing={50}>
                        <Text fontWeight="700" fontSize="24px" align="center">
                            Account created successfully
                        </Text>
                        <Text maxW={512}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </Text>
                        <Link
                            _hover={{ textDecoration: "none" }}
                            _focus={{}}
                            href="/"
                        >
                            <Button
                                color={"white"}
                                bg={colourTheme.colors.Blue}
                                px={10}
                                _hover={{
                                    bg: colourTheme.colors.LightBlue,
                                }}
                                _active={{}}
                                fontWeight={"200"}
                                borderRadius={100}
                            >
                                Browse Classes
                            </Button>
                        </Link>
                    </VStack>
                </Center>
            )}
        </Wrapper>
    );
}

/**
 * getServerSideProps gets the session before this page is rendered
 */
export const getServerSideProps: GetServerSideProps = async (
    context: GetSessionOptions,
) => {
    // obtain the next auth session
    const session = await getSession(context);

    return {
        props: { session },
    };
};
