import {
    Button,
    Box,
    Input,
    FormControl,
    FormLabel,
    Stack,
    HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { GetServerSideProps } from "next"; // Get server side props
import { getSession, GetSessionOptions } from "next-auth/client";
import useLocalStorage from "@utils/useLocalStorage";
import { ParentInput, roles, locale, province } from "@models/User";
import { ParticipantInfoPage } from "@components/parent-form/ParticipantInfoPage";
import { LearningInfoPage } from "@components/parent-form/LearningInfoPage";
import { EmergInfoPage } from "@components/parent-form/EmergInfoPage";
import { IncomePage } from "@components/parent-form/IncomePage";
import { HeardFromPage } from "@components/parent-form/HeardFromPage";
import { ParentCreatedPage } from "@components/parent-form/ParentCreatedPage";
import colourTheme from "@styles/colours";

const DEFAULT_PROVINCE = province.BC;
// TODO: Checkboxes have bugs in them; sometimes render sometimes don't

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
 * This is the page that a user will use to enter the participants personal information
 * onto the SDC platform as a parent of volunteer
 */
export default function ParticipantInfo({
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

    //Page 1

    const [dateOfBirth, setDateOfBirth] = useLocalStorage("dateOfBirth", "");
    const [address1, setAddress1] = useLocalStorage("address1", "");
    const [address2, setAddress2] = useLocalStorage("address2", "");
    const [city, setCity] = useLocalStorage("city", "");
    const [participantProvince, setParticipantProvince] =
        useState(DEFAULT_PROVINCE);
    const [postalCode, setPostalCode] = useLocalStorage("postalCode", "");
    const [school, setSchool] = useLocalStorage("school", "");
    const [grade, setGrade] = useLocalStorage("grade", "");
    const [isOnMedication, setIsOnMedication] = useState(false);
    const [hasAllergies, setHasAllergies] = useState(false);
    const [medication, setMedication] = useLocalStorage("medication", "");
    const [allergies, setAllergies] = useLocalStorage("allergies", "");

    // Participant difficulties & therapy
    const [hasLearningDifficulties, setHasLearningDifficulties] =
        useState(false);
    const [hasPhysicalDifficulties, setHasPhysicalDifficulties] =
        useState(false);
    const [hasSensoryDifficulties, setHasSensoryDifficulties] = useState(false);
    const [participantDifficulties, setParticipantDifficulties] =
        useLocalStorage("participantDifficulties", []);
    const [hasOtherDifficulties, setHasOtherDifficulties] = useState(false);
    const [otherDifficulties, setOtherDifficulties] = useLocalStorage(
        "otherDifficulties",
        "",
    );
    const [specialEd, setSpecialEd] = useLocalStorage(
        "involvedInSpecialEd",
        "",
    );
    const [physiotherapy, setPhysiotherapy] = useState(false);
    const [speechTherapy, setSpeechTherapy] = useState(false);
    const [occupationalTherapy, setOccupationalTherapy] = useState(false);
    const [counseling, setCounseling] = useState(false);
    const [artTherapy, setArtTherapy] = useState(false);
    const [participantTherapy, setParticipantTherapy] = useLocalStorage(
        "participantTherapy",
        [],
    );
    const [hasOtherTherapy, setHasOtherTherapy] = useState(false);
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

    // Heard from
    const [heardFromFriendsAndFam, setHeardFromFriendsAndFam] = useState(false);
    const [heardFromFlyers, setHeardFromFlyers] = useState(false);
    const [heardFromEmail, setHeardFromEmail] = useState(false);
    const [heardFromSocialMedia, setHeardFromSocialMedia] = useState(false);
    const [heardFromOther, setHeardFromOther] = useState(false);
    const [heardFromOptions, setHeardFromOptions] = useLocalStorage(
        "heardFromOptions",
        [],
    );

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
        // start of emergency info
        parentFirstName: emergFirstName,
        setParentFirstName: setEmergFirstName,
        parentLastName: emergLastName,
        setParentLastName: setEmergLastName,
        parentPhoneNumber: emergPhoneNumber,
        setParentPhoneNumber: setEmergPhoneNumber,
        parentRelationship: emergRelationship,
        setParentRelationship: setEmergRelationship,
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
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
        </Box>,
        // Page for emergency info
        <Box>
            <FormPage>
                <EmergInfoPage props={parentRegistrationInfo} />
            </FormPage>
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
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
                        variant="ghost"
                        as="u"
                        onClick={() => setPageNum((prevPage) => prevPage + 1)}
                        borderRadius={100}
                    >
                        Skip for Now
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
                    setPageNum((prevPage) => prevPage + 1);
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
            heardFrom: heardFromOptions.sort(),
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
                otherDifficulties: hasOtherDifficulties
                    ? otherDifficulties
                    : null,
                specialEducation: specialEd,
                therapy: participantTherapy.sort(),
                otherTherapy: hasOtherTherapy ? otherTherapy : null,
                guardianExpectations,
                emergFirstName: emergFirstName,
                emergLastName: emergLastName,
                emergNumber: emergPhoneNumber,
                emergRelationToStudent: emergRelationship,
                medication: isOnMedication ? medication : null,
                allergies: hasAllergies ? allergies : null,
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
        const response = await fetch("api/user", request);
        console.log(response);
        const updatedUserData = await response.json();
        return updatedUserData;
    }

    //Form is finished
    async function updateUserAndClearForm() {
        //Save the user
        const updatedUser = await updateUser();
        if (updatedUser) {
            localStorage.clear();
            return updatedUser;
        } else {
            return null;
        }
    }

    return (
        // Parent account created successfully
        <ParentCreatedPage
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
