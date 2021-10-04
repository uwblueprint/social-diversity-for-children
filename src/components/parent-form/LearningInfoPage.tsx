import React from "react";
import {
    FormLabel,
    FormControl,
    Stack,
    Checkbox,
    RadioGroup,
    Radio,
    Textarea,
} from "@chakra-ui/react";

import { difficulties, therapy } from "@models/User";

type LearningPageProps = {
    styleProps?: Record<string, unknown>;
    props: LearningInfo;
};

type LearningInfo = {
    hasLearningDifficulties: any;
    setHasLearningDifficulties: any;
    hasPhysicalDifficulties: any;
    setHasPhysicalDifficulties: any;
    hasSensoryDifficulties: any;
    setHasSensoryDifficulties: any;
    participantDifficulties: any;
    setParticipantDifficulties: any;
    hasOtherDifficulties: any;
    setHasOtherDifficulties: any;
    otherDifficulties: any;
    setOtherDifficulties: any;
    specialEd: any;
    setSpecialEd: any;
    physiotherapy: any;
    setPhysiotherapy: any;
    speechTherapy: any;
    setSpeechTherapy: any;
    occupationalTherapy: any;
    setOccupationalTherapy: any;
    counseling: any;
    setCounseling: any;
    artTherapy: any;
    setArtTherapy: any;
    participantTherapy: any;
    setParticipantTherapy: any;
    hasOtherTherapy: any;
    setHasOtherTherapy: any;
    otherTherapy: any;
    setOtherTherapy: any;
    guardianExpectations: any;
    setGuardianExpectations: any;
    otherDifficultyDetails: JSX.Element | null;
    otherTherapyDetails: JSX.Element | null;
};
export const LearningInfoPage: React.FC<LearningPageProps> = ({
    props,
}): JSX.Element => {
    return (
        <>
            <FormControl id="participant-have">
                <FormLabel>Does the participant have:</FormLabel>
                <Stack direction="column">
                    <Checkbox
                        key="learningDifficulties"
                        defaultChecked={props.hasLearningDifficulties}
                        isChecked={props.hasLearningDifficulties}
                        onChange={(e) => {
                            props.setHasLearningDifficulties(e.target.checked);
                            if (e.target.checked) {
                                props.participantDifficulties.push(
                                    difficulties.LEARNING,
                                );
                                props.setParticipantDifficulties(
                                    props.participantDifficulties,
                                );
                            } else {
                                const newParticipantDifficulties =
                                    props.participantDifficulties.filter(
                                        (diff) => diff != difficulties.LEARNING,
                                    );
                                props.setParticipantDifficulties(
                                    newParticipantDifficulties,
                                );
                            }
                        }}
                    >
                        Learning difficulties
                    </Checkbox>
                    <Checkbox
                        key="physicalDifficulties"
                        isChecked={props.hasPhysicalDifficulties}
                        onChange={(e) => {
                            props.setHasPhysicalDifficulties(e.target.checked);
                            if (e.target.checked) {
                                props.participantDifficulties.push(
                                    difficulties.PHYSICAL,
                                );
                                props.setParticipantDifficulties(
                                    props.participantDifficulties,
                                );
                            } else {
                                const newParticipantDifficulties =
                                    props.participantDifficulties.filter(
                                        (diff) => diff != difficulties.PHYSICAL,
                                    );
                                props.setParticipantDifficulties(
                                    newParticipantDifficulties,
                                );
                            }
                        }}
                    >
                        Physical difficulties
                    </Checkbox>
                    <Checkbox
                        key="sensoryDifficulties"
                        isChecked={props.hasSensoryDifficulties}
                        onChange={(e) => {
                            props.setHasSensoryDifficulties(e.target.checked);
                            if (e.target.checked) {
                                props.participantDifficulties.push(
                                    difficulties.SENSORY,
                                );
                                props.setParticipantDifficulties(
                                    props.participantDifficulties,
                                );
                            } else {
                                const newParticipantDifficulties =
                                    props.participantDifficulties.filter(
                                        (diff) => diff != difficulties.SENSORY,
                                    );
                                props.setParticipantDifficulties(
                                    newParticipantDifficulties,
                                );
                            }
                        }}
                    >
                        Sensory difficulties
                    </Checkbox>
                    <Checkbox
                        key="otherDifficulties"
                        isChecked={props.hasOtherDifficulties}
                        onChange={(e) =>
                            props.setHasOtherDifficulties(e.target.checked)
                        }
                    >
                        Other
                    </Checkbox>
                    {props.otherDifficultyDetails}
                </Stack>
            </FormControl>
            <FormControl id="special-education" isRequired>
                <FormLabel>
                    Is the participant currently involved in a special education
                    program at their school?
                </FormLabel>
                <Stack direction="row">
                    <RadioGroup>
                        <Radio
                            value={"1"}
                            onChange={() => {
                                props.setSpecialEd(true);
                            }}
                            isChecked={props.specialEd}
                            pr={4}
                        >
                            Yes
                        </Radio>
                        <Radio
                            value={"0"}
                            onChange={() => {
                                props.setSpecialEd(false);
                            }}
                            isChecked={!props.specialEd}
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
                        isChecked={props.physiotherapy}
                        onChange={(e) => {
                            props.setPhysiotherapy(e.target.checked);
                            if (e.target.checked) {
                                props.participantTherapy.push(therapy.PHYSIO);
                                props.setParticipantTherapy(
                                    props.participantTherapy,
                                );
                            } else {
                                const newParticipantTherapy =
                                    props.participantTherapy.filter(
                                        (th) => th != therapy.PHYSIO,
                                    );
                                props.setParticipantTherapy(
                                    newParticipantTherapy,
                                );
                            }
                        }}
                    >
                        Physiotherapy
                    </Checkbox>
                    <Checkbox
                        key="speech language"
                        isChecked={props.speechTherapy}
                        onChange={(e) => {
                            props.setSpeechTherapy(e.target.checked);
                            if (e.target.checked) {
                                props.participantTherapy.push(
                                    therapy.SPEECH_LANG,
                                );
                                props.setParticipantTherapy(
                                    props.participantTherapy,
                                );
                            } else {
                                const newParticipantTherapy =
                                    props.participantTherapy.filter(
                                        (th) => th != therapy.SPEECH_LANG,
                                    );
                                props.setParticipantTherapy(
                                    newParticipantTherapy,
                                );
                            }
                        }}
                    >
                        Speech and Language Therapy
                    </Checkbox>
                    <Checkbox
                        key="occupational therapy"
                        isChecked={props.occupationalTherapy}
                        onChange={(e) => {
                            props.setOccupationalTherapy(e.target.checked);
                            if (e.target.checked) {
                                props.participantTherapy.push(
                                    therapy.OCCUPATIONAL,
                                );
                                props.setParticipantTherapy(
                                    props.participantTherapy,
                                );
                            } else {
                                const newParticipantTherapy =
                                    props.participantTherapy.filter(
                                        (th) => th != therapy.OCCUPATIONAL,
                                    );
                                props.setParticipantTherapy(
                                    newParticipantTherapy,
                                );
                            }
                        }}
                    >
                        Occupational Therapy
                    </Checkbox>
                    <Checkbox
                        key="counselling"
                        isChecked={props.counseling}
                        onChange={(e) => {
                            props.setCounseling(e.target.checked);
                            if (e.target.checked) {
                                props.participantTherapy.push(
                                    therapy.COUNSELING,
                                );
                                props.setParticipantTherapy(
                                    props.participantTherapy,
                                );
                            } else {
                                const newParticipantTherapy =
                                    props.participantTherapy.filter(
                                        (th) => th != therapy.COUNSELING,
                                    );
                                props.setParticipantTherapy(
                                    newParticipantTherapy,
                                );
                            }
                        }}
                    >
                        Psychotherapy/Counseling
                    </Checkbox>
                    <Checkbox
                        key="art"
                        isChecked={props.artTherapy}
                        onChange={(e) => {
                            props.setArtTherapy(e.target.checked);
                            if (e.target.checked) {
                                props.participantTherapy.push(therapy.ART);
                                props.setParticipantTherapy(
                                    props.participantTherapy,
                                );
                            } else {
                                const newParticipantTherapy =
                                    props.participantTherapy.filter(
                                        (th) => th != therapy.ART,
                                    );
                                props.setParticipantTherapy(
                                    newParticipantTherapy,
                                );
                            }
                        }}
                    >
                        Music or Art Therapy
                    </Checkbox>
                    <Checkbox
                        key="otherTherapies"
                        isChecked={props.hasOtherTherapy}
                        onChange={(e) =>
                            props.setHasOtherTherapy(e.target.checked)
                        }
                    >
                        Other
                    </Checkbox>
                    {props.otherTherapyDetails}
                </Stack>
            </FormControl>
            <FormControl id="parent-guardian-expectations">
                <FormLabel>Parent/Guardian Expectations</FormLabel>
                <Textarea
                    placeholder="Details"
                    onChange={(e) =>
                        props.setGuardianExpectations(e.target.value)
                    }
                    value={props.guardianExpectations}
                />
            </FormControl>
        </>
    );
};
