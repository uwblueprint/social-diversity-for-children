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

type LearningInfoPageProps = {
    styleProps?: Record<string, unknown>;
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

export const LearningInfoPage: React.FC<LearningInfoPageProps> = ({
    hasLearningDifficulties,
    setHasLearningDifficulties,
    hasPhysicalDifficulties,
    setHasPhysicalDifficulties,
    hasSensoryDifficulties,
    setHasSensoryDifficulties,
    participantDifficulties,
    setParticipantDifficulties,
    hasOtherDifficulties,
    setHasOtherDifficulties,
    otherDifficulties,
    setOtherDifficulties,
    specialEd,
    setSpecialEd,
    physiotherapy,
    setPhysiotherapy,
    speechTherapy,
    setSpeechTherapy,
    occupationalTherapy,
    setOccupationalTherapy,
    counseling,
    setCounseling,
    artTherapy,
    setArtTherapy,
    participantTherapy,
    setParticipantTherapy,
    hasOtherTherapy,
    setHasOtherTherapy,
    otherTherapy,
    setOtherTherapy,
    guardianExpectations,
    setGuardianExpectations,
    otherDifficultyDetails,
    otherTherapyDetails,
}): JSX.Element => {
    return (
        <>
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
                                        (diff) => diff != difficulties.LEARNING,
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
                                        (diff) => diff != difficulties.PHYSICAL,
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
                                        (diff) => diff != difficulties.SENSORY,
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
                    Is the participant currently involved in a special education
                    program at their school?
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
                                setParticipantTherapy(newParticipantTherapy);
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
                                participantTherapy.push(therapy.SPEECH_LANG);
                                setParticipantTherapy(participantTherapy);
                            } else {
                                const newParticipantTherapy =
                                    participantTherapy.filter(
                                        (th) => th != therapy.SPEECH_LANG,
                                    );
                                setParticipantTherapy(newParticipantTherapy);
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
                                participantTherapy.push(therapy.OCCUPATIONAL);
                                setParticipantTherapy(participantTherapy);
                            } else {
                                const newParticipantTherapy =
                                    participantTherapy.filter(
                                        (th) => th != therapy.OCCUPATIONAL,
                                    );
                                setParticipantTherapy(newParticipantTherapy);
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
                                setParticipantTherapy(newParticipantTherapy);
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
                                setParticipantTherapy(newParticipantTherapy);
                            }
                        }}
                    >
                        Music or Art Therapy
                    </Checkbox>
                    <Checkbox
                        key="otherTherapies"
                        isChecked={hasOtherTherapy}
                        onChange={(e) => setHasOtherTherapy(e.target.checked)}
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
                    onChange={(e) => setGuardianExpectations(e.target.value)}
                    value={guardianExpectations}
                />
            </FormControl>
        </>
    );
};
