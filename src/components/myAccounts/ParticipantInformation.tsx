import React, { useState } from "react";
import { HStack, Button, Box, Text, Stack, FormLabel } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import validator from "validator";
import { PostalCodeField } from "@components/formFields/PostalCodeField";
import { TextField } from "@components/formFields/TextField";
import { ProvinceField } from "@components/formFields/ProvinceField";
import { DateField } from "@components/formFields/DateField";
import { CheckBoxField } from "@components/formFields/CheckBoxField";
import { PhoneNumberField } from "@components/formFields/PhoneNumberField";
import "react-datepicker/dist/react-datepicker.css";
import { therapy, difficulties } from ".prisma/client";

type ParticipantPageProps = {
    styleProps?: Record<string, unknown>;
    props: ParticipantInfo;
};

type ParticipantInfo = {
    student: any;
    save: (participant: any) => void;
    edit: boolean;
};
export const ParticipantInfo: React.FC<ParticipantPageProps> = ({ props }): JSX.Element => {
    const [dateOfBirth, setDateOfBirth] = useState(props.student.dateOfBirth);
    const [address1, setAddress1] = useState(props.student.addressLine1);
    const [address2, setAddress2] = useState(props.student.addressLine2);
    const [city, setCity] = useState(props.student.cityName);
    const [participantProvince, setParticipantProvince] = useState(props.student.province);
    const [postalCode, setPostalCode] = useState(props.student.postalCode);
    const [school, setSchool] = useState(props.student.school);
    const [grade, setGrade] = useState(props.student.grade);
    const [participantFirstName, setParticipantFirstName] = useState(props.student.firstName);
    const [participantLastName, setParticipantLastName] = useState(props.student.lastName);

    // Emergency contact info
    const [emergFirstName, setEmergFirstName] = useState(props.student.emergFirstName);
    const [emergLastName, setEmergLastName] = useState(props.student.emergLastName);
    const [emergPhoneNumber, setEmergPhoneNumber] = useState(props.student.emergNumber);
    const [emergRelationship, setEmergRelationship] = useState(
        props.student.emergRelationToStudent,
    );

    //Particpant Therapy
    const [physiotherapy, setPhysiotherapy] = useState(
        props.student.therapy.includes(therapy.PHYSIO),
    );
    const [speechTherapy, setSpeechTherapy] = useState(
        props.student.therapy.includes(therapy.SPEECH_LANG),
    );
    const [occupationalTherapy, setOccupationalTherapy] = useState(
        props.student.therapy.includes(therapy.OCCUPATIONAL),
    );
    const [counseling, setCounseling] = useState(
        props.student.therapy.includes(therapy.COUNSELING),
    );
    const [artTherapy, setArtTherapy] = useState(props.student.therapy.includes(therapy.ART));
    const [otherTherapy, setOtherTherapy] = useState(props.student.therapy.includes(therapy.OTHER));

    // Participant difficulties
    const [hasLearningDifficulties, setHasLearningDifficulties] = useState(
        props.student.difficulties.includes(difficulties.LEARNING),
    );
    const [hasPhysicalDifficulties, setHasPhysicalDifficulties] = useState(
        props.student.difficulties.includes(difficulties.PHYSICAL),
    );
    const [hasSensoryDifficulties, setHasSensoryDifficulties] = useState(
        props.student.difficulties.includes(difficulties.SENSORY),
    );
    const [hasOtherDifficulties, setHasOtherDifficulties] = useState(
        props.student.difficulties.includes(difficulties.OTHER),
    );

    //Health info
    const [allergies, setAllergies] = useState(props.student.allergies);
    const [medication, setMedication] = useState(props.student.medication);

    const [guardianExpectations, setGuardianExpectations] = useState(
        props.student.guardianExpectations,
    );
    const save = () => {
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
        if (hasLearningDifficulties) difficultiesArray.push(difficulties.LEARNING);
        if (hasPhysicalDifficulties) difficultiesArray.push(difficulties.PHYSICAL);
        if (hasSensoryDifficulties) difficultiesArray.push(difficulties.SENSORY);
        if (hasOtherDifficulties) difficultiesArray.push(difficulties.OTHER);

        const data = {
            id: props.student.id,
            dateOfBirth,
            addressLine1: address1,
            addressLine2: address2,
            cityName: city,
            province: participantProvince,
            postalCode,
            school,
            grade: parseInt(grade, 10),
            firstName: participantFirstName,
            lastName: participantLastName,
            emergFirstName: emergFirstName,
            emergLastName: emergLastName,
            emergNumber: emergPhoneNumber,
            emergRelationToStudent: emergRelationship,
            allergies,
            medication,
            guardianExpectations,
            therapy: therapyArray,
            difficulties: difficultiesArray,
        };
        props.save(data);
        //Put into proper format
        //Call parent props.save(data)
    };

    return (
        <>
            <Box maxW="55rem">
                <Text noOfLines={2} fontSize="16px" fontWeight="200">
                    Please provide information on the participant that is being registered in the
                    program. An opportunity to add information of additional participants you would
                    like to register will be provided afterwards.
                </Text>
            </Box>
            <>
                <HStack spacing="24px" style={{ height: "100px" }}>
                    <TextField
                        name="First Name"
                        value={participantFirstName}
                        setValue={setParticipantFirstName}
                        edit={props.edit}
                    ></TextField>
                    <TextField
                        name="Last Name"
                        value={participantLastName}
                        setValue={setParticipantLastName}
                        edit={props.edit}
                    ></TextField>
                </HStack>
                <br />
                <DateField
                    name={"Date Of Birth"}
                    value={dateOfBirth}
                    setValue={setDateOfBirth}
                    edit={props.edit}
                />
                <br />
                <br />
                <TextField
                    name="Street Address"
                    value={address1}
                    setValue={setAddress1}
                    placeholder="815 Hornby St."
                    edit={props.edit}
                ></TextField>
                <br />
                <br />
                <TextField
                    name="Street Address 2"
                    value={address2}
                    setValue={setAddress2}
                    placeholder="815 Hornby St."
                    required={false}
                    edit={props.edit}
                ></TextField>
                <br />
                <HStack spacing="24px" style={{ height: 100 }}>
                    <TextField
                        name="City"
                        value={city}
                        setValue={setCity}
                        placeholder="Vancouver"
                        edit={props.edit}
                    ></TextField>
                    <ProvinceField
                        name="Province"
                        value={participantProvince}
                        setValue={setParticipantProvince}
                        edit={props.edit}
                    ></ProvinceField>
                    <PostalCodeField
                        value={postalCode}
                        setValue={setPostalCode}
                        name="Postal Code"
                        edit={props.edit}
                    ></PostalCodeField>
                </HStack>
                <br />
                <TextField
                    name="School (if applicable)"
                    value={school}
                    setValue={setSchool}
                    placeholder="Vancouver"
                    required={false}
                    edit={props.edit}
                ></TextField>
                <br />
                <br />
                <TextField
                    name="Grade (if applicable)"
                    value={grade}
                    setValue={setGrade}
                    placeholder="5"
                    required={false}
                    edit={props.edit}
                ></TextField>
                <br />
                <br />
                <Stack direction="column">
                    <FormLabel>The participant has</FormLabel>
                    <CheckBoxField
                        value={hasLearningDifficulties}
                        name={"Learning difficulties"}
                        setValue={setHasLearningDifficulties}
                        required={false}
                        spacing={false}
                        edit={props.edit}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={hasPhysicalDifficulties}
                        name={"Physical difficulties"}
                        setValue={setHasPhysicalDifficulties}
                        required={false}
                        spacing={false}
                        edit={props.edit}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={hasSensoryDifficulties}
                        name={"Sensory difficulties"}
                        setValue={setHasSensoryDifficulties}
                        required={false}
                        spacing={false}
                        edit={props.edit}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={hasOtherDifficulties}
                        name={"Other difficulties"}
                        setValue={setHasOtherDifficulties}
                        required={false}
                        spacing={false}
                        edit={props.edit}
                    ></CheckBoxField>
                </Stack>
                <br />
                <br />
                <TextField
                    name="Parent/Guardian Expectations"
                    value={guardianExpectations}
                    setValue={setGuardianExpectations}
                    edit={props.edit}
                ></TextField>
                <br />
                <br />
                <TextField
                    name="Food Allergies"
                    value={allergies}
                    setValue={setAllergies}
                    edit={props.edit}
                ></TextField>
                <br />
                <br />
                <Stack direction="column">
                    <FormLabel>Forms of therapy</FormLabel>
                    <CheckBoxField
                        value={physiotherapy}
                        name={"Physiotherapy"}
                        setValue={setPhysiotherapy}
                        required={false}
                        spacing={false}
                        edit={props.edit}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={speechTherapy}
                        name={"Speech and Language Therapy"}
                        setValue={setSpeechTherapy}
                        required={false}
                        spacing={false}
                        edit={props.edit}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={occupationalTherapy}
                        name={"Occupational Therapy"}
                        setValue={setOccupationalTherapy}
                        required={false}
                        spacing={false}
                        edit={props.edit}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={counseling}
                        name={"Psychotherapy/Counseling"}
                        setValue={setCounseling}
                        required={false}
                        spacing={false}
                        edit={props.edit}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={artTherapy}
                        name={"Music or Art Therapy"}
                        setValue={setArtTherapy}
                        required={false}
                        spacing={false}
                        edit={props.edit}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={otherTherapy}
                        name={"Other"}
                        setValue={setOtherTherapy}
                        required={false}
                        spacing={false}
                        edit={props.edit}
                    ></CheckBoxField>
                </Stack>
                <br />
                <Text fontWeight={700} fontSize={24}>
                    Emergency Information
                </Text>
                <HStack spacing="24px" style={{ height: 100 }}>
                    <TextField
                        name="Emergency Contact First Name"
                        value={emergFirstName}
                        setValue={setEmergFirstName}
                        edit={props.edit}
                    ></TextField>
                    <TextField
                        name="Emergency Contact Last Name"
                        value={emergLastName}
                        setValue={setEmergLastName}
                        edit={props.edit}
                    ></TextField>
                </HStack>
                <br />
                <br />
                <PhoneNumberField
                    name="Emergency Contact Phone Number"
                    value={emergPhoneNumber}
                    setValue={setEmergPhoneNumber}
                    edit={props.edit}
                ></PhoneNumberField>
                <br />
                <br />
                <TextField
                    name="Emergency Contact Relationship to Participant"
                    placeholder="Mother"
                    value={emergRelationship}
                    setValue={setEmergRelationship}
                    edit={props.edit}
                ></TextField>
                <br />
                <br />
                <Text fontWeight={700} fontSize={24}>
                    Health Information
                </Text>
                <br />
                <TextField
                    name="If yes, please provide any details if necessary"
                    value={medication}
                    setValue={setMedication}
                    placeholder="Details"
                    required={false}
                    edit={props.edit}
                ></TextField>
                <br />
                <br />
                <TextField
                    name="If yes, please provide any details if necessary"
                    value={allergies}
                    setValue={setAllergies}
                    placeholder="Details"
                    required={false}
                    edit={props.edit}
                ></TextField>
                <br />
                <Box>
                    {props.edit ? (
                        <Button
                            id="Submit"
                            bg={colourTheme.colors.Blue}
                            color={"white"}
                            fontWeight="400"
                            my={8}
                            px={12}
                            borderRadius={100}
                            mt={8}
                            disabled={
                                !participantFirstName ||
                                !participantLastName ||
                                !dateOfBirth ||
                                !address1 ||
                                !city ||
                                !participantProvince ||
                                !validator.isPostalCode(postalCode, "CA")
                            }
                            onClick={save}
                        >
                            Save Changes
                        </Button>
                    ) : null}
                </Box>
            </>
        </>
    );
};
