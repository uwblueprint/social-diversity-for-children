import {
    Button,
    Box,
    Input,
    FormControl,
    FormLabel,
    Stack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { GetServerSideProps } from "next"; // Get server side props
import { getSession } from "next-auth/client";
import useLocalStorage from "@utils/hooks/useLocalStorage";
import { province } from "@models/User";
import colourTheme from "@styles/colours";
import { mutate } from "swr";
import { therapy, difficulties } from ".prisma/client";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { CreateStudentInput } from "@models/Student";

/*
Dynamic import is a next.js feature. 
You can add properties like {srr: false} to prevent a srr if the component is static
Additionally, you use this to conditionally load a component during render
*/
const ParticipantInfoPage = dynamic(
    () =>
        import("@components/parent-form/ParticipantInfoPage").then(
            (module) => module.ParticipantInfoPage,
        ),
    { ssr: false },
);
const LearningInfoPage = dynamic(
    () =>
        import("@components/parent-form/LearningInfoPage").then(
            (module) => module.LearningInfoPage,
        ),
    { ssr: false },
);
const EmergInfoPage = dynamic(
    () =>
        import("@components/parent-form/EmergInfoPage").then(
            (module) => module.EmergInfoPage,
        ),
    { ssr: false },
);
const HealthInfoPage = dynamic(
    () =>
        import("@components/parent-form/HealthInfoPage").then(
            (module) => module.HealthInfoPage,
        ),
    { ssr: false },
);
const ParticipantCreatedPage = dynamic(
    () =>
        import("@components/parent-form/ParticipantCreatedPage").then(
            (module) => module.ParticipantCreatedPage,
        ),
    { ssr: false },
);

const DEFAULT_PROVINCE = province.BC;

const FormPage = (props) => {
    return <Stack spacing={8}>{props.children}</Stack>;
};

/**
 * This is the page that a user will use to enter the participants personal information
 * onto the SDC platform as a parent of volunteer
 */
export default function ParticipantInfo({
    session,
}: {
    session: Record<string, unknown>;
}): JSX.Element {
    const router = useRouter();
    const { page } = router.query;
    const [progressBar, setProgressBar] = useState(Number);
    const [pageNum, setPageNum] = useState<number>(
        page ? parseInt(page as string, 10) : 0,
    );

    const formButtonOnClick = () => {
        setPageNum(pageNum + 1);
        window.scrollTo({ top: 0 });
        if (pageNum === formPages.length - 1) {
            createParticipantAndClearForm();
        }
    };

    /* Store form fields in local storage */
    // Participant info
    const [participantFirstName, setParticipantFirstName] = useLocalStorage(
        "participantFirstName",
        "",
    );
    const [participantLastName, setParticipantLastName] = useLocalStorage(
        "participantLastName",
        "",
    );

    //States to store the answers to the questions

    //Page 1 - Personal Information
    const [dateOfBirth, setDateOfBirth] = useLocalStorage("dateOfBirth", "");
    const [address1, setAddress1] = useLocalStorage("address1", "");
    const [address2, setAddress2] = useLocalStorage("address2", "");
    const [city, setCity] = useLocalStorage("city", "");
    const [participantProvince, setParticipantProvince] =
        useState(DEFAULT_PROVINCE);
    const [postalCode, setPostalCode] = useLocalStorage("postalCode", "");
    const [school, setSchool] = useLocalStorage("school", "");
    const [grade, setGrade] = useLocalStorage("grade", "");

    //Health
    const [hasMedication, setHasMedication] = useLocalStorage(
        "hasMedication",
        false,
    );
    const [hasAllergies, setHasAllergies] = useLocalStorage(
        "hasAllergies",
        false,
    );
    const [medication, setMedication] = useLocalStorage("medication", "");
    const [allergies, setAllergies] = useLocalStorage("allergies", "");

    // Participant difficulties & therapy
    const [hasLearningDifficulties, setHasLearningDifficulties] =
        useLocalStorage("learning", false);
    const [hasPhysicalDifficulties, setHasPhysicalDifficulties] =
        useLocalStorage("physical", false);
    const [hasSensoryDifficulties, setHasSensoryDifficulties] = useLocalStorage(
        "sensory",
        false,
    );
    const [participantDifficulties, setParticipantDifficulties] =
        useLocalStorage("participantDifficulties", []);
    const [hasOtherDifficulties, setHasOtherDifficulties] = useLocalStorage(
        "hasOtherDifficulties",
        false,
    );
    const [otherDifficulties, setOtherDifficulties] = useLocalStorage(
        "otherDifficulties",
        "",
    );
    const [specialEd, setSpecialEd] = useLocalStorage(
        "involvedInSpecialEd",
        false,
    );
    const [physiotherapy, setPhysiotherapy] = useLocalStorage("physio", false);
    const [speechTherapy, setSpeechTherapy] = useLocalStorage("speech", false);
    const [occupationalTherapy, setOccupationalTherapy] = useLocalStorage(
        "occupational",
        false,
    );
    const [counseling, setCounseling] = useLocalStorage("conseling", false);
    const [artTherapy, setArtTherapy] = useLocalStorage("art", false);
    const [participantTherapy, setParticipantTherapy] = useLocalStorage(
        "participantTherapy",
        false,
    );
    const [hasOtherTherapy, setHasOtherTherapy] = useLocalStorage(
        "hasOtherTherapy",
        false,
    );
    const [otherTherapy, setOtherTherapy] = useLocalStorage("otherTherapy", "");

    // Parent/guardian expectations
    const [guardianExpectations, setGuardianExpectations] = useLocalStorage(
        "guardianExpectations",
        "",
    );

    // Emergency contact info
    const [emergFirstName, setEmergFirstName] = useLocalStorage(
        "emergFirstName",
        "",
    );
    const [emergLastName, setEmergLastName] = useLocalStorage(
        "emergLastName",
        "",
    );
    const [emergPhoneNumber, setEmergPhoneNumber] = useLocalStorage(
        "emergNumber",
        "",
    );
    const [emergRelationship, setEmergRelationship] = useLocalStorage(
        "emergRelationship",
        "",
    );

    const [addParticipantSuccess, setAddParticipantSuccess] =
        useState("pending");

    const otherDifficultyDetails = hasOtherDifficulties ? (
        <Box mt={4}>
            <FormControl id="difficulty-details">
                <FormLabel>Please provide any details if necessary</FormLabel>
                <Input
                    placeholder="Details"
                    onChange={(e) => setOtherDifficulties(e.target.value)}
                    value={otherDifficulties}
                />
            </FormControl>
        </Box>
    ) : null;

    const otherTherapyDetails = hasOtherTherapy ? (
        <Box mt={4}>
            <FormControl id="therapy-details">
                <FormLabel>Please provide any details if necessary</FormLabel>
                <Input
                    placeholder="Details"
                    onChange={(e) => setOtherTherapy(e.target.value)}
                    value={otherTherapy}
                />
            </FormControl>
        </Box>
    ) : null;

    // JSON object containing local storage values, pass to page components
    const parentRegistrationInfo = {
        //start of general info
        participantFirstName: participantFirstName,
        setParticipantFirstName: setParticipantFirstName,
        participantLastName: participantLastName,
        setParticipantLastName: setParticipantLastName,
        dateOfBirth: dateOfBirth,
        setDateOfBirth: setDateOfBirth,
        address1: address1,
        setAddress1: setAddress1,
        address2: address2,
        setAddress2: setAddress2,
        city: city,
        setCity: setCity,
        participantProvince: participantProvince,
        setParticipantProvince: setParticipantProvince,
        postalCode: postalCode,
        setPostalCode: setPostalCode,
        school: school,
        setSchool: setSchool,
        grade: grade,
        setGrade: setGrade,
        // start of learning info
        hasLearningDifficulties: hasLearningDifficulties,
        setHasLearningDifficulties: setHasLearningDifficulties,
        hasPhysicalDifficulties: hasPhysicalDifficulties,
        setHasPhysicalDifficulties: setHasPhysicalDifficulties,
        hasSensoryDifficulties: hasSensoryDifficulties,
        setHasSensoryDifficulties: setHasSensoryDifficulties,
        participantDifficulties: participantDifficulties,
        setParticipantDifficulties: setParticipantDifficulties,
        hasOtherDifficulties: hasOtherDifficulties,
        setHasOtherDifficulties: setHasOtherDifficulties,
        otherDifficulties: otherDifficulties,
        setOtherDifficulties: setOtherDifficulties,
        specialEd: specialEd,
        setSpecialEd: setSpecialEd,
        physiotherapy: physiotherapy,
        setPhysiotherapy: setPhysiotherapy,
        speechTherapy: speechTherapy,
        setSpeechTherapy: setSpeechTherapy,
        occupationalTherapy: occupationalTherapy,
        setOccupationalTherapy: setOccupationalTherapy,
        counseling: counseling,
        setCounseling: setCounseling,
        artTherapy: artTherapy,
        setArtTherapy: setArtTherapy,
        participantTherapy: participantTherapy,
        setParticipantTherapy: setParticipantTherapy,
        hasOtherTherapy: hasOtherTherapy,
        setHasOtherTherapy: setHasOtherTherapy,
        otherTherapy: otherTherapy,
        setOtherTherapy: setOtherTherapy,
        guardianExpectations: guardianExpectations,
        setGuardianExpectations: setGuardianExpectations,
        otherDifficultyDetails: otherDifficultyDetails,
        otherTherapyDetails: otherTherapyDetails,
        //start of emergency info
        emergFirstName: emergFirstName,
        setEmergFirstName: setEmergFirstName,
        emergLastName: emergLastName,
        setEmergLastName: setEmergLastName,
        emergPhoneNumber: emergPhoneNumber,
        setEmergPhoneNumber: setEmergPhoneNumber,
        emergRelationship: emergRelationship,
        setEmergRelationship: setEmergRelationship,
        //start of health info
        hasMedication: hasMedication,
        setHasMedication: setHasMedication,
        hasAllergies: hasAllergies,
        setHasAllergies: setHasAllergies,

        allergies: allergies,
        setAllergies: setAllergies,
        medication: medication,
        setMedication: setMedication,

        formButtonOnClick: formButtonOnClick,
    };

    const formPages = [
        // Page for general participant info
        <Box>
            <FormPage>
                <ParticipantInfoPage props={parentRegistrationInfo} />
            </FormPage>
        </Box>,
        // Page for learning info
        <Box>
            <FormPage>
                <LearningInfoPage props={parentRegistrationInfo} />
            </FormPage>
        </Box>,
        // Page for emergency info
        <Box>
            <FormPage>
                <EmergInfoPage props={parentRegistrationInfo} />
            </FormPage>
        </Box>,
        //health
        <Box>
            <FormPage>
                <HealthInfoPage props={parentRegistrationInfo} />
            </FormPage>
        </Box>,
    ];

    const totalPages = formPages.length;
    const progressBarIncrement = Math.ceil(100 / totalPages);

    if (progressBar <= 0) {
        setProgressBar(progressBarIncrement);
    }

    async function createParticipant() {
        //Save Therapy
        const therapyArray = [];
        if (physiotherapy) therapyArray.push(therapy.PHYSIO);
        if (speechTherapy) therapyArray.push(therapy.SPEECH_LANG);
        if (occupationalTherapy) therapyArray.push(therapy.OCCUPATIONAL);
        if (counseling) therapyArray.push(therapy.COUNSELING);
        if (artTherapy) therapyArray.push(therapy.ART);
        if (otherTherapy) therapyArray.push(therapy.OTHER);

        //Save Difficulties
        const difficultiesArray = [];
        if (hasLearningDifficulties)
            difficultiesArray.push(difficulties.LEARNING);
        if (hasPhysicalDifficulties)
            difficultiesArray.push(difficulties.PHYSICAL);
        if (hasSensoryDifficulties)
            difficultiesArray.push(difficulties.SENSORY);
        if (hasOtherDifficulties) difficultiesArray.push(difficulties.OTHER);

        console.log(session);

        const createStudentInput: CreateStudentInput = {
            firstName: participantFirstName,
            lastName: participantLastName,
            parentId: (session as any).id as number,
            dateOfBirth: new Date(dateOfBirth),
            addressLine1: address1,
            addressLine2: address2,
            postalCode: postalCode,
            cityName: city,
            province: participantProvince,
            school: school,
            grade: parseInt(grade, 10),
            difficulties: difficultiesArray,
            otherDifficulties: null,
            specialEducation: specialEd,
            therapy: therapyArray,
            otherTherapy: null,
            guardianExpectations,
            emergFirstName: emergFirstName,
            emergLastName: emergLastName,
            emergNumber: emergPhoneNumber,
            emergRelationToStudent: emergRelationship,
            hasMedication: hasMedication,
            medication: medication,
            hasAllergies: hasAllergies,
            allergies: allergies,
        };

        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(createStudentInput),
        };
        const response = await fetch("/api/student", request);
        const createdParticipantData = await response.json();
        return createdParticipantData;
    }

    //Form is finished
    async function createParticipantAndClearForm() {
        //Save the user
        const newParticipant = await createParticipant();
        if (newParticipant) {
            setAddParticipantSuccess("success");
            localStorage.clear();
            mutate("/api/user/me"); //Clear the user - causing a refresh
            return newParticipant;
        } else {
            setAddParticipantSuccess("failure");
            return null;
        }
    }

    return (
        // Parent account created successfully
        <ParticipantCreatedPage
            successful={addParticipantSuccess}
            session={session}
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPages={totalPages}
            formPages={formPages}
            name={`${participantFirstName} ${participantLastName}`}
        />
    );
}

/**
 * getServerSideProps gets the session before this page is rendered
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    // obtain the next auth session
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
            ...(await serverSideTranslations(context.locale, ["form"])),
        },
    };
};
