import { Button, Box, Stack, Text, HStack } from "@chakra-ui/react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next"; // Get server side props
import { getSession } from "next-auth/client";
import useLocalStorage from "@utils/hooks/useLocalStorage";
import { roles, locale, province, VolunteerInput } from "@models/User";
import colourTheme from "@styles/colours";
import { mutate } from "swr";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { Session } from "next-auth";

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
    () => import("@components/volunteer-form/CriminalPage").then((module) => module.CriminalPage),
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
            borderRadius="6px"
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
export default function VolunteerInfo({ session }: { session: Session }): JSX.Element {
    const router = useRouter();
    const { page, uploaded } = router.query;
    const { t } = useTranslation("form");
    const [progressBar, setProgressBar] = useState(Number);
    const [pageNum, setPageNum] = useState<number>(page ? parseInt(page as string, 10) : 0);
    const formButtonOnClick = () => {
        setPageNum(pageNum + 1);
        window.scrollTo({ top: 0 });
        if (pageNum === formPages.length - 1) {
            updateUserAndClearForm();
        }
    };

    /* Store form fields in local storage */
    //Volunteer Info - Page 1
    const [volunteerFirstName, setVolunteerFirstName] = useLocalStorage("volunteerFirstName", "");
    const [volunteerLastName, setVolunteerLastName] = useLocalStorage("volunteerLastName", "");
    const [phoneNumber, setPhoneNumber] = useLocalStorage("phoneNumber", "");

    //volunteer Personal Details - Page 2
    const [dateOfBirth, setDateOfBirth] = useLocalStorage("dateOfBirth", "");
    const [address1, setAddress1] = useLocalStorage("address1", "");
    const [city, setCity] = useLocalStorage("city", "");
    const [participantProvince, setParticipantProvince] = useState(DEFAULT_PROVINCE);
    const [postalCode, setPostalCode] = useLocalStorage("postalCode", "");
    const [school, setSchool] = useLocalStorage("school", "");
    const [certifyAge15, setCertifyAge15] = useLocalStorage("age15", false);

    //volunteer personal details - Page 3
    const [skills, setSkills] = useLocalStorage("skills", "");
    const [heardFrom, setHeardFrom] = useLocalStorage("heardFrom", "");
    const [certifyCommit, setCertifyCommit] = useLocalStorage("certifyCommit", false);

    const [successfulAccountCreation, setSuccessfulAccountCreation] = useState("pending");

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
        // Page to upload criminal record check
        <Box>
            <FormPage>
                <CriminalPage />
            </FormPage>
            <Box>
                <HStack spacing="24px">
                    <FormButton
                        onClick={() => {
                            router.push(
                                `/document-upload?type=criminal-check&redirect=/volunteer/signup?page=${
                                    pageNum + 1
                                }`,
                            );
                        }}
                    >
                        {t("bgc.upload")}
                    </FormButton>
                    <Button
                        variant="link"
                        color="black"
                        fontWeight={400}
                        _hover={{ color: colourTheme.colors.Gray }}
                        onClick={() => {
                            setPageNum(pageNum + 1);
                            updateUserAndClearForm();
                        }}
                        borderRadius="6px"
                    >
                        <Text as="u">{t("form.skip")}</Text>
                    </Button>
                </HStack>
            </Box>
        </Box>,
        // Page for volunteer skills
        <Box>
            <FormPage>
                <VolunteerSkillsPage props={volunteerRegistrationInfo} />
            </FormPage>
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
            criminalRecordCheckLink: uploaded ? (uploaded as string) : undefined,
            criminalCheckSubmittedAt: uploaded ? new Date() : undefined,
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
        const updatedUserData = await response.json();
        return updatedUserData;
    }

    async function updateUserAndClearForm() {
        const updatedUser = await updateUser();
        if (updatedUser) {
            setSuccessfulAccountCreation("success");
            localStorage.clear();
            mutate("/api/user/me"); //Clear the user - causing a refresh
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
export const getServerSideProps: GetServerSideProps = async (context) => {
    // obtain the next auth session
    const session = await getSession(context);

    return {
        props: {
            session,
            ...(await serverSideTranslations(context.locale, ["form", "common"])),
        },
    };
};
