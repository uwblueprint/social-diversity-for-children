import { Button, Box, Stack, HStack } from "@chakra-ui/react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next"; // Get server side props
import { getSession, GetSessionOptions } from "next-auth/client";
import useLocalStorage from "@utils/useLocalStorage";
import { roles, locale, province, VolunteerInput } from "@models/User";
import colourTheme from "@styles/colours";

/*
Dynamic import is a next.js feature. 
You can add properties like {srr: false} to prevent a srr if the component is static
Additionally, you use this to conditionally load a component during render
*/
const VolunteerInfoPage = dynamic(
    () =>
        import("@components/volunteer-form/VolunteerInfoPage").then(
            (module) => module.VolunteerInfoPage,
        ),
    { ssr: false },
);

const VolunteerDetailsPage = dynamic(
    () =>
        import("@components/volunteer-form/VolunteerDetailsPage").then(
            (module) => module.VolunteerDetailsPage,
        ),
    { ssr: false },
);

const VolunteerSkillsPage = dynamic(
    () =>
        import("@components/volunteer-form/VolunteerSkillsPage").then(
            (module) => module.VolunteerSkillsPage,
        ),
    { ssr: false },
);

const CriminalPage = dynamic(
    () =>
        import("@components/volunteer-form/CriminalPage").then(
            (module) => module.CriminalPage,
        ),
    { ssr: false },
);

const VolunteerCreatedPage = dynamic(
    () =>
        import("@components/volunteer-form/VolunteerCreatedPage").then(
            (module) => module.VolunteerCreatedPage,
        ),
    { ssr: false },
);

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
    //Volunteer Info - Page 1
    const [volunteerFirstName, setVolunteerFirstName] = useLocalStorage(
        "volunteerFirstName",
        "",
    );
    const [volunteerLastName, setVolunteerLastName] = useLocalStorage(
        "volunteerLastName",
        "",
    );
    const [phoneNumber, setPhoneNumber] = useLocalStorage("phoneNumber", "");

    //volunteer Personal Details - Page 2
    const [dateOfBirth, setDateOfBirth] = useLocalStorage("dateOfBirth", "");
    const [address1, setAddress1] = useLocalStorage("address1", "");
    const [city, setCity] = useLocalStorage("city", "");
    const [participantProvince, setParticipantProvince] =
        useState(DEFAULT_PROVINCE);
    const [postalCode, setPostalCode] = useLocalStorage("postalCode", "");
    const [school, setSchool] = useLocalStorage("school", "");
    const [certifyAge15, setCertifyAge15] = useLocalStorage("age15", false);

    //volunteer personal details - Page 3
    const [skills, setSkills] = useLocalStorage("skills", "");
    const [heardFrom, setHeardFrom] = useLocalStorage("heardFrom", "");
    const [certifyCommit, setCertifyCommit] = useLocalStorage(
        "certifyCommit",
        false,
    );

    const [successfulAccountCreation, setSuccessfulAccountCreation] =
        useState("pending");

    // JSON object with volunteer registration info
    const volunteerRegistrationInfo = {
        //Page 1
        volunteerFirstName: volunteerFirstName,
        setVolunteerFirstName: setVolunteerFirstName,
        volunteerLastName: volunteerLastName,
        setVolunteerLastName: setVolunteerLastName,
        phoneNumber: phoneNumber,
        setPhoneNumber: setPhoneNumber,
        //Page 2
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
        certifyAge15: certifyAge15,
        setCertifyAge15: setCertifyAge15,
        //Page 3
        skills: skills,
        setSkills: setSkills,
        heardFrom: heardFrom,
        setHeardFrom: setHeardFrom,
        certifyCommit: certifyCommit,
        setCertifyCommit: setCertifyCommit,
        //Move onto next page
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
        const response = await fetch("/api/user", request);
        if (response.status === 200) {
            const updatedUserData = await response.json();
            return updatedUserData;
        } else {
            return null;
        }
    }

    async function updateUserAndClearForm() {
        const updatedUser = await updateUser();
        if (updatedUser) {
            setSuccessfulAccountCreation("success");
            localStorage.clear();
            return updatedUser;
        } else {
            setSuccessfulAccountCreation("failure");
            return null;
        }
    }

    return (
        <VolunteerCreatedPage
            successful={successfulAccountCreation}
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
