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

const BLUE = "#0C53A0"; // TODO: move to src/styles
const RADIO_YES = "yes";
const RADIO_NO = "no";
// TODO: Checkboxes have bugs in them; sometimes render sometimes don't

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
    const [participantProvince, setParticipantProvince] = useState(province.BC);
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
    const [physiotherapy, setPhysiotherapy] = useLocalStorage(
        "physiotherapy",
        false,
    );
    const [speechTherapy, setSpeechTherapy] = useLocalStorage(
        "speechTherapy",
        false,
    );
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
        "Confirm Participants",
        "Proof of Income",
        "How did you hear about us?",
    ];

    const formPages = [
        <Box>
            <FormPage>
                <Box maxW="55rem">
                    <Text noOfLines={2} fontSize="16px" fontWeight="200">
                        Please provide information on the participant that is
                        being registered in the program. An opportunity to add
                        information of additional participants you would like to
                        register will be provided afterwards.
                    </Text>
                </Box>
                <FormLabel>
                    Participant Name
                    <HStack spacing="24px">
                        <FormControl id="participant-first-name">
                            <Input
                                placeholder="First name"
                                onChange={(e) =>
                                    setParticipantFirstName(e.target.value)
                                }
                                value={participantFirstName}
                            />
                        </FormControl>
                        <FormControl id="participant-last-name">
                            <Input
                                placeholder="Last name"
                                onChange={(e) =>
                                    setParticipantLastName(e.target.value)
                                }
                                value={participantLastName}
                            />
                        </FormControl>
                    </HStack>
                </FormLabel>
                <FormControl id="date-of-birth">
                    <FormLabel>Date Of Birth (YYYY-MM-DD) </FormLabel>
                    <Input
                        placeholder="Date Of Birth"
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        value={dateOfBirth}
                    />
                </FormControl>
                <FormControl id="street-address-1">
                    <FormLabel>Street Address 1</FormLabel>
                    <Input
                        placeholder="815 Hornby St."
                        onChange={(e) => setAddress1(e.target.value)}
                        value={address1}
                    />
                </FormControl>
                <FormControl id="street-address-2">
                    <FormLabel>Street Address 2</FormLabel>
                    <Input
                        placeholder="Suite 203"
                        onChange={(e) => setAddress2(e.target.value)}
                        value={address2}
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
                            placeholder={"Select option"}
                            onChange={(e) =>
                                setParticipantProvince(e.target.value)
                            }
                            value={participantProvince} // TODO: bug with displayed value after refresh
                        >
                            {Object.entries(province)
                                .sort()
                                .map((prov) => {
                                    const [key, val] = prov;
                                    return (
                                        <option key={key} value={val}>
                                            {val}
                                        </option>
                                    );
                                })}
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
                <FormControl id="grade">
                    <FormLabel>Grade (if applicable)</FormLabel>
                    <Input
                        placeholder="5"
                        onChange={(e) => setGrade(e.target.value)}
                        value={grade}
                    />
                </FormControl>
            </FormPage>
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
        </Box>,
        <Box>
            <FormPage>
                <FormControl id="participant-have">
                    <FormLabel>Does the participant have:</FormLabel>
                    <Stack direction="column">
                        <Checkbox
                            key="learningDifficulties"
                            defaultChecked={hasLearningDifficulties}
                            isChecked={hasLearningDifficulties}
                            onChange={(e) => {
                                setHasLearningDifficulties(e.target.checked);
                                if (e.target.checked) {
                                    participantDifficulties.push(
                                        difficulties.LEARNING,
                                    );
                                    setParticipantDifficulties(
                                        participantDifficulties,
                                    );
                                } else {
                                    const newParticipantDifficulties =
                                        participantDifficulties.filter(
                                            (diff) =>
                                                diff != difficulties.LEARNING,
                                        );
                                    setParticipantDifficulties(
                                        newParticipantDifficulties,
                                    );
                                }
                            }}
                        >
                            Learning difficulties
                        </Checkbox>
                        <Checkbox
                            key="physicalDifficulties"
                            isChecked={hasPhysicalDifficulties}
                            onChange={(e) => {
                                setHasPhysicalDifficulties(e.target.checked);
                                if (e.target.checked) {
                                    participantDifficulties.push(
                                        difficulties.PHYSICAL,
                                    );
                                    setParticipantDifficulties(
                                        participantDifficulties,
                                    );
                                } else {
                                    const newParticipantDifficulties =
                                        participantDifficulties.filter(
                                            (diff) =>
                                                diff != difficulties.PHYSICAL,
                                        );
                                    setParticipantDifficulties(
                                        newParticipantDifficulties,
                                    );
                                }
                            }}
                        >
                            Physical difficulties
                        </Checkbox>
                        <Checkbox
                            key="sensoryDifficulties"
                            isChecked={hasSensoryDifficulties}
                            onChange={(e) => {
                                setHasSensoryDifficulties(e.target.checked);
                                if (e.target.checked) {
                                    participantDifficulties.push(
                                        difficulties.SENSORY,
                                    );
                                    setParticipantDifficulties(
                                        participantDifficulties,
                                    );
                                } else {
                                    const newParticipantDifficulties =
                                        participantDifficulties.filter(
                                            (diff) =>
                                                diff != difficulties.SENSORY,
                                        );
                                    setParticipantDifficulties(
                                        newParticipantDifficulties,
                                    );
                                }
                            }}
                        >
                            Sensory difficulties
                        </Checkbox>
                        <Checkbox
                            key="otherDifficulties"
                            isChecked={hasOtherDifficulties}
                            onChange={(e) =>
                                setHasOtherDifficulties(e.target.checked)
                            }
                        >
                            Other
                        </Checkbox>
                        {otherDifficultyDetails}
                    </Stack>
                </FormControl>
                <FormControl id="special-education">
                    <FormLabel>
                        Is the participant currently involved in a special
                        education program at their school?
                    </FormLabel>
                    <Stack direction="row">
                        <RadioGroup>
                            <Radio
                                value={"1"}
                                onChange={() => {
                                    setSpecialEd(true);
                                }}
                                isChecked={specialEd}
                                pr={4}
                            >
                                Yes
                            </Radio>
                            <Radio
                                value={"0"}
                                onChange={() => {
                                    setSpecialEd(false);
                                }}
                                isChecked={!specialEd}
                                pr={4}
                            >
                                No
                            </Radio>
                        </RadioGroup>
                    </Stack>
                </FormControl>
                <FormControl id="therapy">
                    <FormLabel>
                        Is the participant revieving any other form of therapy?
                    </FormLabel>
                    <Stack direction="column">
                        <Checkbox
                            key="physiotherapy"
                            isChecked={physiotherapy}
                            onChange={(e) => {
                                setPhysiotherapy(e.target.checked);
                                if (e.target.checked) {
                                    participantTherapy.push(therapy.PHYSIO);
                                    setParticipantTherapy(participantTherapy);
                                } else {
                                    const newParticipantTherapy =
                                        participantTherapy.filter(
                                            (th) => th != therapy.PHYSIO,
                                        );
                                    setParticipantTherapy(
                                        newParticipantTherapy,
                                    );
                                }
                            }}
                        >
                            Physiotherapy
                        </Checkbox>
                        <Checkbox
                            key="speech language"
                            isChecked={speechTherapy}
                            onChange={(e) => {
                                setSpeechTherapy(e.target.checked);
                                if (e.target.checked) {
                                    participantTherapy.push(
                                        therapy.SPEECH_LANG,
                                    );
                                    setParticipantTherapy(participantTherapy);
                                } else {
                                    const newParticipantTherapy =
                                        participantTherapy.filter(
                                            (th) => th != therapy.SPEECH_LANG,
                                        );
                                    setParticipantTherapy(
                                        newParticipantTherapy,
                                    );
                                }
                            }}
                        >
                            Speech and Language Therapy
                        </Checkbox>
                        <Checkbox
                            key="occupational therapy"
                            isChecked={occupationalTherapy}
                            onChange={(e) => {
                                setOccupationalTherapy(e.target.checked);
                                if (e.target.checked) {
                                    participantTherapy.push(
                                        therapy.OCCUPATIONAL,
                                    );
                                    setParticipantTherapy(participantTherapy);
                                } else {
                                    const newParticipantTherapy =
                                        participantTherapy.filter(
                                            (th) => th != therapy.OCCUPATIONAL,
                                        );
                                    setParticipantTherapy(
                                        newParticipantTherapy,
                                    );
                                }
                            }}
                        >
                            Occupational Therapy
                        </Checkbox>
                        <Checkbox
                            key="counselling"
                            isChecked={counseling}
                            onChange={(e) => {
                                setCounseling(e.target.checked);
                                if (e.target.checked) {
                                    participantTherapy.push(therapy.COUNSELING);
                                    setParticipantTherapy(participantTherapy);
                                } else {
                                    const newParticipantTherapy =
                                        participantTherapy.filter(
                                            (th) => th != therapy.COUNSELING,
                                        );
                                    setParticipantTherapy(
                                        newParticipantTherapy,
                                    );
                                }
                            }}
                        >
                            Psychotherapy/Counseling
                        </Checkbox>
                        <Checkbox
                            key="art"
                            isChecked={artTherapy}
                            onChange={(e) => {
                                setArtTherapy(e.target.checked);
                                if (e.target.checked) {
                                    participantTherapy.push(therapy.ART);
                                    setParticipantTherapy(participantTherapy);
                                } else {
                                    const newParticipantTherapy =
                                        participantTherapy.filter(
                                            (th) => th != therapy.ART,
                                        );
                                    setParticipantTherapy(
                                        newParticipantTherapy,
                                    );
                                }
                            }}
                        >
                            Music or Art Therapy
                        </Checkbox>
                        <Checkbox
                            key="otherTherapies"
                            isChecked={hasOtherTherapy}
                            onChange={(e) =>
                                setHasOtherTherapy(e.target.checked)
                            }
                        >
                            Other
                        </Checkbox>
                        {otherTherapyDetails}
                    </Stack>
                </FormControl>
                <FormControl id="parent-guardian-expectations">
                    <FormLabel>Parent/Guardian Expectations</FormLabel>
                    <Textarea
                        placeholder="Details"
                        onChange={(e) =>
                            setGuardianExpectations(e.target.value)
                        }
                        value={guardianExpectations}
                    />
                </FormControl>
            </FormPage>
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
        </Box>,
        <Box>
            <FormPage>
                <Box maxW="55rem">
                    <Text noOfLines={3} fontSize="16px" fontWeight="200">
                        The information on this form will be used at the
                        discretion of the activity instructor/coordinator to
                        ensure care and attention is given to the safety and
                        health of your child. All information on this form is
                        considered Personal and Confidential. The contact listed
                        on the emergency form cannot be the same contact listed
                        as the parent above.
                    </Text>
                </Box>
                <FormLabel>
                    Emergency Contact Name
                    <HStack spacing="24px">
                        <FormControl id="emergency-first-name">
                            <Input
                                placeholder="First Name"
                                onChange={(e) =>
                                    setEmergFirstName(e.target.value)
                                }
                                value={emergFirstName}
                            />
                        </FormControl>
                        <FormControl id="emergency-last-name">
                            <Input
                                placeholder="Last name"
                                onChange={(e) =>
                                    setEmergLastName(e.target.value)
                                }
                                value={emergLastName}
                            />
                        </FormControl>
                    </HStack>
                </FormLabel>
                <FormControl id="emergency-contact-cell-number">
                    <FormLabel>Emergency Contact Cell Number </FormLabel>
                    <Input
                        placeholder="289 349 1048"
                        onChange={(e) => setEmergNumber(e.target.value)}
                        value={emergNumber}
                    />
                </FormControl>
                <FormControl id="emergency-relationship-to-participant">
                    <FormLabel>Relationship to Participant</FormLabel>
                    <Input
                        placeholder="Mother"
                        onChange={(e) => setEmergRelationship(e.target.value)}
                        value={emergRelationship}
                    />
                </FormControl>
            </FormPage>
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
        </Box>,
        <Box>
            <FormPage>
                <Box maxW="55rem">
                    <Text noOfLines={3} fontSize="16px" fontWeight="200">
                        The information on this form will be used at the
                        discretion of the activity instructor/coordinator to
                        ensure care and attention is given to the safety and
                        health of your child. All information on this form is
                        considered Personal and Confidential. The contact listed
                        on the emergency form cannot be the same contact listed
                        as the parent above.
                    </Text>
                </Box>
                <FormControl id="medication">
                    <RadioGroup
                        onChange={(val) => setIsOnMedication(val === RADIO_YES)}
                    >
                        <FormLabel>Is your child on medication?</FormLabel>
                        <Stack direction="row">
                            <Radio value={RADIO_YES} pr={4}>
                                Yes
                            </Radio>
                            <Radio value={RADIO_NO} pr={4}>
                                No
                            </Radio>
                        </Stack>
                    </RadioGroup>
                    {medicationDetails}
                </FormControl>
                <FormControl id="allergies">
                    <RadioGroup
                        onChange={(val) => setHasAllergies(val === RADIO_YES)}
                    >
                        <FormLabel>
                            Does your child have any food allergies?
                        </FormLabel>
                        <Stack direction="row">
                            <Radio value={RADIO_YES} pr={4}>
                                Yes
                            </Radio>
                            <Radio value={RADIO_NO} pr={4}>
                                No
                            </Radio>
                        </Stack>
                    </RadioGroup>
                    {allergyDetails}
                </FormControl>
            </FormPage>
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
        </Box>,
        <Box>
            <FormPage>
                <FormLabel>
                    Parent/Guardian Name
                    <HStack spacing="24px">
                        <FormControl id="parent-first-name">
                            <Input
                                placeholder="First name"
                                onChange={(e) =>
                                    setParentFirstName(e.target.value)
                                }
                                value={parentFirstName}
                            />
                        </FormControl>
                        <FormControl id="parent-last-name">
                            <Input
                                placeholder="Last name"
                                onChange={(e) =>
                                    setParentLastName(e.target.value)
                                }
                                value={parentLastName}
                            />
                        </FormControl>
                    </HStack>
                </FormLabel>
                <FormControl id="phone-number">
                    <FormLabel>Phone Number </FormLabel>
                    <Input
                        placeholder="289 349 1048"
                        onChange={(e) => setParentPhoneNumber(e.target.value)}
                        value={parentPhoneNumber}
                    />
                </FormControl>
                <FormControl id="parent-relationship-to-participant">
                    <FormLabel>Relationship to Participant</FormLabel>
                    <Input
                        placeholder="Mother"
                        onChange={(e) => setParentRelationship(e.target.value)}
                        value={parentRelationship}
                    />
                </FormControl>
            </FormPage>
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
        </Box>,
        <Box>
            <FormPage>
                <Box maxW="55rem">
                    <Text margin="10px" fontSize="16px" fontWeight="200">
                        Upload a Proof of Income to recieve automated discounts
                        on classes you take!
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
                        <OrderedList
                            margin="10px"
                            fontSize="16px"
                            fontWeight="400"
                        >
                            <ListItem>
                                Navigate to My Account, Proof of Income
                            </ListItem>
                            <ListItem>
                                Upload a copy of the result to your SDC account
                            </ListItem>
                            <ListItem>
                                Once you’ve submitted your proof of income, keep
                                an eye out for approval status from SDC!
                            </ListItem>
                            <ListItem>
                                Upon approval, discounts will automatically
                                applied to your account! Check your account for
                                details on the amount of discount you have been
                                approved for
                            </ListItem>
                        </OrderedList>
                    </Heading>
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

            childFirstName: participantFirstName,
            childLastName: participantLastName,
            childDateOfBirth: new Date(dateOfBirth),
            addressLine1: address1,
            addressLine2: address2,
            postalCode: postalCode,
            cityName: city,
            province: participantProvince,
            school: school,
            grade: parseInt(grade, 10),

            difficulties: participantDifficulties.sort(),
            otherDifficulties: hasOtherDifficulties ? otherDifficulties : null,
            specialEducation: specialEd,
            therapy: participantTherapy.sort(),
            otherTherapy: hasOtherTherapy ? otherTherapy : null,

            guardianExpectations,
            emergencyContactFirstName: emergFirstName,
            emergencyContactLastName: emergLastName,
            emergencyContactPhoneNumber: emergNumber,
            emergencyContactRelationToStudent: emergRelationship,
            medication: isOnMedication ? medication : null,
            allergies: hasAllergies ? allergies : null,
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
        setParticipantProvince("");
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
