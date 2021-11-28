import React from "react";
import { FormLabel, FormControl, Stack, Button, Box } from "@chakra-ui/react";
import { TextField } from "@components/formFields/TextField";
import { CheckBoxField } from "@components/formFields/CheckBoxField";
import colourTheme from "@styles/colours";

type LearningPageProps = {
    styleProps?: Record<string, unknown>;
    props: LearningInfo;
};

type LearningInfo = {
    hasLearningDifficulties: boolean;
    setHasLearningDifficulties: (text: boolean) => void;
    hasPhysicalDifficulties: boolean;
    setHasPhysicalDifficulties: (text: boolean) => void;
    hasSensoryDifficulties: boolean;
    setHasSensoryDifficulties: (text: boolean) => void;
    participantDifficulties: any[];
    setParticipantDifficulties: (text: boolean[]) => void;
    hasOtherDifficulties: boolean;
    setHasOtherDifficulties: (text: boolean) => void;
    otherDifficulties: any;
    setOtherDifficulties: (text: any) => void;
    specialEd: boolean;
    setSpecialEd: (text: boolean) => void;
    physiotherapy: boolean;
    setPhysiotherapy: (text: boolean) => void;
    speechTherapy: boolean;
    setSpeechTherapy: (text: boolean) => void;
    occupationalTherapy: boolean;
    setOccupationalTherapy: (text: boolean) => void;
    counseling: boolean;
    setCounseling: (text: boolean) => void;
    artTherapy: boolean;
    setArtTherapy: (text: boolean) => void;
    participantTherapy: boolean;
    setParticipantTherapy: (text: boolean) => void;
    hasOtherTherapy: boolean;
    setHasOtherTherapy: (text: boolean) => void;
    otherTherapy: any;
    setOtherTherapy: (text: any) => void;
    guardianExpectations: string;
    setGuardianExpectations: (text: string) => void;
    otherDifficultyDetails: JSX.Element | null;
    otherTherapyDetails: JSX.Element | null;
    formButtonOnClick: () => void;
};
export const LearningInfoPage: React.FC<LearningPageProps> = ({
    props,
}): JSX.Element => {
    return (
        <>
            <FormControl id="participant-have">
                <Stack direction="column">
                    <FormLabel>Does the participant have:</FormLabel>
                    <CheckBoxField
                        value={props.hasLearningDifficulties}
                        name={"Learning difficulties"}
                        setValue={props.setHasLearningDifficulties}
                        required={false}
                        spacing={false}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={props.hasPhysicalDifficulties}
                        name={"Physical difficulties"}
                        setValue={props.setHasPhysicalDifficulties}
                        required={false}
                        spacing={false}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={props.hasSensoryDifficulties}
                        name={"Sensory difficulties"}
                        setValue={props.setHasSensoryDifficulties}
                        required={false}
                        spacing={false}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={props.hasOtherDifficulties}
                        name={"Other difficulties"}
                        setValue={props.setHasOtherDifficulties}
                        required={false}
                        spacing={false}
                    ></CheckBoxField>
                </Stack>
            </FormControl>
            <CheckBoxField
                value={props.specialEd}
                name={
                    "Is the participant currently involved in a special education program at their school?"
                }
                setValue={props.setSpecialEd}
                required={false}
            ></CheckBoxField>
            <br />
            <FormControl id="therapy">
                <FormLabel>
                    Is the participant revieving any other form of therapy?
                </FormLabel>
                <Stack direction="column">
                    <CheckBoxField
                        value={props.physiotherapy}
                        name={"Physiotherapy"}
                        setValue={props.setPhysiotherapy}
                        required={false}
                        spacing={false}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={props.speechTherapy}
                        name={"Speech and Language Therapy"}
                        setValue={props.setSpeechTherapy}
                        required={false}
                        spacing={false}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={props.occupationalTherapy}
                        name={"Occupational Therapy"}
                        setValue={props.setOccupationalTherapy}
                        required={false}
                        spacing={false}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={props.counseling}
                        name={"Psychotherapy/Counseling"}
                        setValue={props.setCounseling}
                        required={false}
                        spacing={false}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={props.artTherapy}
                        name={"Music or Art Therapy"}
                        setValue={props.setArtTherapy}
                        required={false}
                        spacing={false}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={props.otherTherapy}
                        name={"Other"}
                        setValue={props.setOtherTherapy}
                        required={false}
                        spacing={false}
                    ></CheckBoxField>
                </Stack>
            </FormControl>
            <>
                <TextField
                    name="Parent/Guardian Expectations"
                    value={props.guardianExpectations}
                    setValue={props.setGuardianExpectations}
                    placeholder="Details"
                    longAnswer={true}
                ></TextField>
            </>
            <Box>
                <Button
                    id="Submit"
                    bg={colourTheme.colors.Blue}
                    color={"white"}
                    fontWeight="400"
                    my={8}
                    px={12}
                    borderRadius={100}
                    mt={8}
                    disabled={!props.guardianExpectations}
                    onClick={props.formButtonOnClick}
                >
                    Next
                </Button>
            </Box>
        </>
    );
};
