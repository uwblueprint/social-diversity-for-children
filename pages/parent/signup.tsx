import {
    Button,
    Box,
    Input,
    FormControl,
    FormLabel,
    Stack,
    Text,
    HStack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { GetServerSideProps } from "next"; // Get server side props
import { getSession, GetSessionOptions } from "next-auth/client";
import useLocalStorage from "@utils/useLocalStorage";
import { ParentInput, roles, locale, province } from "@models/User";
import colourTheme from "@styles/colours";
import { mutate } from "swr";

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
const ParentInfoPage = dynamic(
    () =>
        import("@components/parent-form/ParentInfoPage").then(
            (module) => module.ParentInfoPage,
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
const HeardFromPage = dynamic(
    () =>
        import("@components/parent-form/HeardFromPage").then(
            (module) => module.HeardFromPage,
        ),
    { ssr: false },
);
const IncomePage = dynamic(
    () =>
        import("@components/parent-form/IncomePage").then(
            (module) => module.IncomePage,
        ),
    { ssr: false },
);

const ParentCreatedPage = dynamic(
    () =>
        import("@components/parent-form/ParentCreatedPage").then(
            (module) => module.ParentCreatedPage,
        ),
    { ssr: false },
);

const DEFAULT_PROVINCE = province.BC;

const PROOF_OF_INCOME_EXAMPLES = ["Income tax notice", "Paystub", "etc"];

const UPLOADING_PROOF_OF_INCOME = [
    `Navigate to My Account > Proof of Income`,
    `Upload a copy of the result to your SDC account`,
    `Once you’ve submitted your proof of income, keep an eye out for approval status from SDC!`,
    `Upon approval, discounts will automatically applied to your account!
    Check your account for details on the amount of discount you have been approved for`,
];

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
 * This is the page that a user will use to enter the participants personal information
 * onto the SDC platform as a parent of volunteer
 */
export default function ParticipantInfo({
    session,
}: {
    session: Record<string, unknown>;
}): JSX.Element {
    const [progressBar, setProgressBar] = useState(Number);
    const [pageNum, setPageNum] = useLocalStorage("VolunteerPage", 0);

    const formButtonOnClick = () => {
        setPageNum(pageNum + 1);
        window.scrollTo({ top: 0 });
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

    // Parent info
    const [parentFirstName, setParentFirstName] = useLocalStorage(
        "parentFirstName",
        "",
    );
    const [parentLastName, setParentLastName] = useLocalStorage(
        "parentLastName",
        "",
    );
    const [parentPhoneNumber, setParentPhoneNumber] = useLocalStorage(
        "parentPhoneNumber",
        "",
    );
    const [parentRelationship, setParentRelationship] = useLocalStorage(
        "parentRelationship",
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

    // Heard from
    const [heardFromFriendsAndFam, setHeardFromFriendsAndFam] = useLocalStorage(
        "friends",
        false,
    );
    const [heardFromFlyers, setHeardFromFlyers] = useLocalStorage(
        "flyers",
        false,
    );
    const [heardFromEmail, setHeardFromEmail] = useLocalStorage("email", false);
    const [heardFromSocialMedia, setHeardFromSocialMedia] = useLocalStorage(
        "socialmedia",
        false,
    );
    const [heardFromOther, setHeardFromOther] = useLocalStorage("other", false);
    const [heardFromOptions, setHeardFromOptions] = useLocalStorage(
        "heardFromOptions",
        null,
    );

    const [successfulAccountCreation, setSuccessfulAccountCreation] =
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

        // start of parent info
        parentFirstName: parentFirstName,
        setParentFirstName: setParentFirstName,
        parentLastName: parentLastName,
        setParentLastName: setParentLastName,
        parentPhoneNumber: parentPhoneNumber,
        setParentPhoneNumber: setParentPhoneNumber,
        parentRelationship: parentRelationship,
        setParentRelationship: setParentRelationship,
        // start of heard about information
        heardFromFriendsAndFam: heardFromFriendsAndFam,
        setHeardFromFriendsAndFam: setHeardFromFriendsAndFam,
        heardFromFlyers: heardFromFlyers,
        setHeardFromFlyers: setHeardFromFlyers,
        heardFromEmail: heardFromEmail,
        setHeardFromEmail: setHeardFromEmail,
        heardFromSocialMedia: heardFromSocialMedia,
        setHeardFromSocialMedia: setHeardFromSocialMedia,
        heardFromOther: heardFromOther,
        setHeardFromOther: setHeardFromOther,
        heardFromOptions: heardFromOptions,
        setHeardFromOptions: setHeardFromOptions,
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
        // Page for parent info
        <Box>
            <FormPage>
                <ParentInfoPage props={parentRegistrationInfo} />
            </FormPage>
        </Box>,
        // Page for proof of income
        <Box>
            <FormPage>
                <IncomePage
                    UPLOADING_PROOF_OF_INCOME={UPLOADING_PROOF_OF_INCOME}
                    PROOF_OF_INCOME_EXAMPLES={PROOF_OF_INCOME_EXAMPLES}
                />
            </FormPage>
            <Box>
                <HStack spacing="24px">
                    <FormButton>Upload Proof of Income</FormButton>
                    <Button
                        variant="link"
                        color="black"
                        fontWeight={400}
                        _hover={{ color: colourTheme.colors.Gray }}
                        onClick={() => setPageNum(pageNum + 1)}
                        borderRadius="6px"
                    >
                        <Text as="u">Skip for Now</Text>
                    </Button>
                </HStack>
            </Box>
        </Box>,
        // page for heard from info
        <Box>
            <FormPage>
                <HeardFromPage props={parentRegistrationInfo} />
            </FormPage>
            <FormButton
                onClick={() => {
                    setPageNum(pageNum + 1);
                    updateUserAndClearForm();
                }}
            >
                Finish
            </FormButton>
        </Box>,
    ];

    const totalPages = formPages.length;
    const progressBarIncrement = Math.ceil(100 / totalPages);

    if (progressBar <= 0) {
        setProgressBar(progressBarIncrement);
    }

    async function updateUser() {
        const parentData: ParentInput = {
            phoneNumber: parentPhoneNumber,
            isLowIncome: undefined, // TODO
            preferredLanguage: locale.en,
            proofOfIncomeLink: undefined, // TODO
            heardFrom: [],
            createStudentInput: {
                firstName: participantFirstName,
                lastName: participantLastName,
                dateOfBirth: new Date(dateOfBirth),
                addressLine1: address1,
                addressLine2: address2,
                postalCode: postalCode,
                cityName: city,
                province: participantProvince,
                school: school,
                grade: parseInt(grade, 10),
                difficulties: participantDifficulties.sort(),
                otherDifficulties: null,
                specialEducation: specialEd,
                therapy: [],
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
            },
        };
        const userData = {
            firstName: parentFirstName,
            lastName: parentLastName,
            role: roles.PARENT,
            roleData: parentData,
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

    //Form is finished
    async function updateUserAndClearForm() {
        //Save the user
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
        // Parent account created successfully
        <ParentCreatedPage
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
