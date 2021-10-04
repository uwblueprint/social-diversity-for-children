import { Button, Box, Stack, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { GetServerSideProps } from "next"; // Get server side props
import { getSession, GetSessionOptions } from "next-auth/client";
import useLocalStorage from "@utils/useLocalStorage";
import { roles, locale, province, VolunteerInput } from "@models/User";
import colourTheme from "@styles/colours";
import { VolunteerInfoPage } from "@components/volunteer-form/VolunteerInfoPage";
import { VolunteerDetailsPage } from "@components/volunteer-form/VolunteerDetailsPage";
import { VolunteerSkillsPage } from "@components/volunteer-form/VolunteerSkillsPage";
import { CriminalPage } from "@components/volunteer-form/CriminalPage";
import { VolunteerCreatedPage } from "@components/volunteer-form/VolunteerCreatedPage";

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
        formButtonOnClick: formButtonOnClick,
    };

    const formPages = [
        // Page for general volunteer info
        <Box>
            <FormPage>
                <VolunteerInfoPage props={volunteerRegistrationInfo} />
            </FormPage>
        </Box>,
        // Page for volunteer details
        <Box>
            <FormPage>
                <VolunteerDetailsPage props={volunteerRegistrationInfo} />
            </FormPage>
        </Box>,
        // Page for volunteer skills
        <Box>
            <FormPage>
                <VolunteerSkillsPage props={volunteerRegistrationInfo} />
            </FormPage>
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
        </Box>,
        // Page to upload criminal record check
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
        <VolunteerCreatedPage
            session={session}
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPages={totalPages}
            formPages={formPages}
        />
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
