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
import {
    difficulties,
    ParentInput,
    roles,
    locale,
    therapy,
    province,
    heardFrom,
} from "@models/User";
import { ParticipantInfoPage } from "@components/ParticipantInfoPage";
import { LearningInfoPage } from "@components/LearningInfoPage";
import { EmergInfoPage } from "@components/EmergInfoPage";

const BLUE = "#0C53A0"; // TODO: move to src/styles
const RADIO_YES = "yes";
const RADIO_NO = "no";
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
            bg={BLUE}
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
    const [emergNumber, setEmergNumber] = useLocalStorage("emergNumber", "");
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

    const medicationDetails = isOnMedication ? (
        <Box mt={4}>
            <FormControl id="details">
                <FormLabel>Please provide any details if necessary</FormLabel>
                <Input
                    placeholder="Details"
                    onChange={(e) => setMedication(e.target.value)}
                    value={medication}
                />
            </FormControl>
        </Box>
    ) : null;

    const allergyDetails = hasAllergies ? (
        <Box mt={4}>
            <FormControl id="details">
                <FormLabel>Please provide any details if necessary</FormLabel>
                <Input
                    placeholder="Details"
                    onChange={(e) => setAllergies(e.target.value)}
                    value={allergies}
                />
            </FormControl>
        </Box>
    ) : null;

    const otherDifficultyDetails = hasOtherDifficulties ? (
        <Box mt={4}>
            <FormControl id="difficulty details">
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
            <FormControl id="therapy details">
                <FormLabel>Please provide any details if necessary</FormLabel>
                <Input
                    placeholder="Details"
                    onChange={(e) => setOtherTherapy(e.target.value)}
                    value={otherTherapy}
                />
            </FormControl>
        </Box>
    ) : null;

    const formPageHeaders = [
        "Participant Information",
        "Participant Information",
        "Participant Emergency Form",
        "Participant Health Form",
        "Parent Guardian Information",
        "Proof of Income",
        "How did you hear about us?",
    ];

    const formPages = [
        // Page for general participant info
        <Box>
            <FormPage>
                <ParticipantInfoPage
                    participantFirstName={participantFirstName}
                    setParticipantFirstName={setParticipantFirstName}
                    participantLastName={participantLastName}
                    setParticipantLastName={setParticipantLastName}
                    dateOfBirth={dateOfBirth}
                    setDateOfBirth={setDateOfBirth}
                    address1={address1}
                    setAddress1={setAddress1}
                    address2={address2}
                    setAddress2={setAddress2}
                    city={city}
                    setCity={setCity}
                    participantProvince={participantProvince}
                    setParticipantProvince={setParticipantProvince}
                    postalCode={postalCode}
                    setPostalCode={setPostalCode}
                    school={school}
                    setSchool={setSchool}
                    grade={grade}
                    setGrade={setGrade}
                />
            </FormPage>
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
        </Box>,
        // Page for
        <Box>
            <FormPage>
                <LearningInfoPage
                    hasLearningDifficulties={hasLearningDifficulties}
                    setHasLearningDifficulties={setHasLearningDifficulties}
                    hasPhysicalDifficulties={hasPhysicalDifficulties}
                    setHasPhysicalDifficulties={setHasPhysicalDifficulties}
                    hasSensoryDifficulties={hasSensoryDifficulties}
                    setHasSensoryDifficulties={setHasSensoryDifficulties}
                    participantDifficulties={participantDifficulties}
                    setParticipantDifficulties={setParticipantDifficulties}
                    hasOtherDifficulties={hasOtherDifficulties}
                    setHasOtherDifficulties={setHasOtherDifficulties}
                    otherDifficulties={otherDifficulties}
                    setOtherDifficulties={setOtherDifficulties}
                    specialEd={specialEd}
                    setSpecialEd={setSpecialEd}
                    physiotherapy={physiotherapy}
                    setPhysiotherapy={setPhysiotherapy}
                    speechTherapy={speechTherapy}
                    setSpeechTherapy={setSpeechTherapy}
                    occupationalTherapy={occupationalTherapy}
                    setOccupationalTherapy={setOccupationalTherapy}
                    counseling={counseling}
                    setCounseling={setCounseling}
                    artTherapy={artTherapy}
                    setArtTherapy={setArtTherapy}
                    participantTherapy={participantTherapy}
                    setParticipantTherapy={setParticipantTherapy}
                    hasOtherTherapy={hasOtherTherapy}
                    setHasOtherTherapy={setHasOtherTherapy}
                    otherTherapy={otherTherapy}
                    setOtherTherapy={setOtherTherapy}
                    guardianExpectations={guardianExpectations}
                    setGuardianExpectations={setGuardianExpectations}
                    otherDifficultyDetails={otherDifficultyDetails}
                    otherTherapyDetails={otherTherapyDetails}
                />
            </FormPage>
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
        </Box>,
        <Box>
            <FormPage>
                <EmergInfoPage
                    parentFirstName={parentFirstName}
                    setParentFirstName={setParentFirstName}
                    parentLastName={parentLastName}
                    setParentLastName={setParentLastName}
                    parentPhoneNumber={parentPhoneNumber}
                    setParentPhoneNumber={setParentPhoneNumber}
                    parentRelationship={parentRelationship}
                    setParentRelationship={setParentRelationship}
                />
            </FormPage>
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
        </Box>,
        <Box>
            <FormPage>
                <Box maxW="55rem">
                    <Text fontSize="16px" fontWeight="200" mb="60px">
                        Upload a Proof of Income to recieve automated discounts
                        on classes you take!
                    </Text>
                    <Heading fontSize="22px" fontWeight="900">
                        Examples of Proof of Income Include
                    </Heading>
                    <br />
                    <UnorderedList
                        margin="10px"
                        fontSize="16px"
                        fontWeight="400"
                    >
                        {PROOF_OF_INCOME_EXAMPLES.map((poi, idx) => (
                            <ListItem key={idx} mx="20px">
                                {poi}
                            </ListItem>
                        ))}
                    </UnorderedList>
                    <br />
                    <Heading fontSize="22px" fontWeight="900">
                        Uploading your Proof of Income
                    </Heading>
                    <br />
                    <OrderedList margin="10px" fontSize="16px" fontWeight="400">
                        {UPLOADING_PROOF_OF_INCOME.map((poi, idx) => (
                            <ListItem key={idx} mx="20px">
                                {poi}
                            </ListItem>
                        ))}
                    </OrderedList>
                </Box>
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
        <Box>
            <FormPage>
                <FormControl id="hear-about-us">
                    <FormLabel>How did you hear about our programs?</FormLabel>
                    <Stack direction="column">
                        <Checkbox
                            isChecked={heardFromFriendsAndFam}
                            onChange={(e) => {
                                setHeardFromFriendsAndFam(e.target.checked);
                                if (e.target.checked) {
                                    heardFromOptions.push(
                                        heardFrom.FRIENDS_FAMILY,
                                    );
                                    setHeardFromOptions(heardFromOptions);
                                } else {
                                    const newHeardFromOptions =
                                        heardFromOptions.filter(
                                            (hf) =>
                                                hf != heardFrom.FRIENDS_FAMILY,
                                        );
                                    setHeardFromOptions(newHeardFromOptions);
                                }
                            }}
                        >
                            Friends and Family
                        </Checkbox>
                        <Checkbox
                            isChecked={heardFromFlyers}
                            onChange={(e) => {
                                setHeardFromFlyers(e.target.checked);
                                if (e.target.checked) {
                                    heardFromOptions.push(heardFrom.FLYERS);
                                    setHeardFromOptions(heardFromOptions);
                                } else {
                                    const newHeardFromOptions =
                                        heardFromOptions.filter(
                                            (hf) => hf != heardFrom.FLYERS,
                                        );
                                    setHeardFromOptions(newHeardFromOptions);
                                }
                            }}
                        >
                            Flyers
                        </Checkbox>
                        <Checkbox
                            isChecked={heardFromEmail}
                            onChange={(e) => {
                                setHeardFromEmail(e.target.checked);
                                if (e.target.checked) {
                                    heardFromOptions.push(heardFrom.EMAIL);
                                    setHeardFromOptions(heardFromOptions);
                                } else {
                                    const newHeardFromOptions =
                                        heardFromOptions.filter(
                                            (hf) => hf != heardFrom.EMAIL,
                                        );
                                    setHeardFromOptions(newHeardFromOptions);
                                }
                            }}
                        >
                            Email
                        </Checkbox>
                        <Checkbox
                            isChecked={heardFromSocialMedia}
                            onChange={(e) => {
                                setHeardFromSocialMedia(e.target.checked);
                                if (e.target.checked) {
                                    heardFromOptions.push(
                                        heardFrom.SOCIAL_MEDIA,
                                    );
                                    setHeardFromOptions(heardFromOptions);
                                } else {
                                    const newHeardFromOptions =
                                        heardFromOptions.filter(
                                            (hf) =>
                                                hf != heardFrom.SOCIAL_MEDIA,
                                        );
                                    setHeardFromOptions(newHeardFromOptions);
                                }
                            }}
                        >
                            Social Media
                        </Checkbox>
                        <Checkbox
                            isChecked={heardFromOther}
                            onChange={(e) => {
                                setHeardFromOther(e.target.checked);
                                if (e.target.checked) {
                                    heardFromOptions.push(heardFrom.OTHER);
                                    setHeardFromOptions(heardFromOptions);
                                } else {
                                    const newHeardFromOptions =
                                        heardFromOptions.filter(
                                            (hf) => hf != heardFrom.OTHER,
                                        );
                                    setHeardFromOptions(newHeardFromOptions);
                                }
                            }}
                        >
                            Other
                        </Checkbox>
                    </Stack>
                </FormControl>
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

    const getProgressBarValue = (pageNum) =>
        progressBarIncrement * (pageNum + 1);

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
                emergNumber: emergNumber,
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
        const updatedUserData = await response.json();
        return updatedUserData;
    }

    const clearLocalStorage = () => {
        setParticipantFirstName("");
        setParticipantLastName("");
        setDateOfBirth("");
        setAddress1("");
        setAddress2("");
        setCity("");
        setParticipantProvince(DEFAULT_PROVINCE);
        setPostalCode("");
        setSchool("");
        setGrade("");
        setHasLearningDifficulties(false);
        setHasPhysicalDifficulties(false);
        setHasSensoryDifficulties(false);
        setHasOtherDifficulties(false);
        setOtherDifficulties("");
        setParticipantDifficulties([]);
        setSpecialEd(false);
        setPhysiotherapy(false);
        setSpeechTherapy(false);
        setOccupationalTherapy(false);
        setCounseling(false);
        setArtTherapy(false);
        setHasOtherTherapy(false);
        setOtherTherapy("");
        setParticipantTherapy([]);
        setGuardianExpectations("");
        setMedication("");
        setAllergies("");
        setEmergFirstName("");
        setEmergLastName("");
        setEmergNumber("");
        setEmergRelationship("");
        setHeardFromFriendsAndFam(false);
        setHeardFromFlyers(false);
        setHeardFromEmail(false);
        setHeardFromSocialMedia(false);
        setHeardFromOther(false);
        setHeardFromOptions([]);
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
                                color={BLUE}
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
                                bg={"#0C53A0"}
                                px={10}
                                _hover={{
                                    bg: "#2C6AAD",
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
