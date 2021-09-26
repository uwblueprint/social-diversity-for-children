import {
    Button,
    Box,
    Center,
    Flex,
    Text,
    Link,
    Progress,
    Stack,
    HStack,
    VStack,
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
import { VolunteerInfoPage } from "@components/VolunteerInfoPage"
import { VolunteerDetailsPage } from "@components/VolunteerDetailsPage";
import { VolunteerSkillsPage } from "@components/VolunteerSkillsPage";
import { CriminalPage } from "@components/CriminalPage";
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

    // JSON object with volunteer registration info
    const volunteerRegistrationInfo = {
        volunteerFirstName: volunteerFirstName,
        setVolunteerFirstName: setVolunteerFirstName,
        volunteerLastName: volunteerLastName,
        setVolunteerLastName: setVolunteerLastName,
        phoneNumber: phoneNumber,
        setPhoneNumber: setPhoneNumber,
        dateOfBirth: dateOfBirth,
        setDateOfBirth: setDateOfBirth,
        address1: address1,
        setAddress1: setAddress1,
        city: city,
        setCity: setCity,
        participantProvince: participantProvince,
        setParticipantProvince: setParticipantProvince,
        postalCode: postalCode,
        setPostalCode: setPostalCode,
        school: school,
        setSchool: setSchool,
        skills: skills,
        setSkills: setSkills,
        heardFrom: heardFrom,
        setHeardFrom: setHeardFrom,
    }
    const formPageHeaders = [
        "Volunteer Information",
        "Volunteer Personal Details",
        "Volunteer Personal Details",
        "Criminal Record Check",
    ];

    const formPages = [
        // Page for general volunteer info
        <Box>
            <FormPage>
                <VolunteerInfoPage
                    props={volunteerRegistrationInfo} />
            </FormPage>
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
        </Box>,
        // Page for volunteer details
        <Box>
            <FormPage>
                <VolunteerDetailsPage props={volunteerRegistrationInfo} />
            </FormPage>
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
        </Box>,
        // Page for volunteer skills
        <Box>
            <FormPage>
                <VolunteerSkillsPage props={volunteerRegistrationInfo} />
            </FormPage>
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
        </Box>,
        // Page for uploading criminal record check
        <Box>
            <FormPage>
                <CriminalPage />
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
