import React from "react";
import { VStack, Button, Box } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import { TextField } from "@components/formFields/TextField";
import { CheckBoxField } from "@components/formFields/CheckBoxField";

type VolunteerSkillsPageProps = {
    styleProps?: Record<string, unknown>;
    props: VolunteerSkillsInfo;
};

type VolunteerSkillsInfo = {
    skills: string;
    setSkills: (text: string) => void;
    heardFrom: string;
    setHeardFrom: (text: string) => void;
    certifyCommit: boolean;
    setCertifyCommit: (value: boolean) => void;
    formButtonOnClick: () => void;
};

export const VolunteerSkillsPage: React.FC<VolunteerSkillsPageProps> = ({ props }): JSX.Element => {
    return (
        <>
            <VStack>
                <TextField
                    name="Skills/Experience (ex. Arts and Crafts, Music, First-Aid
                    Certificates, Teaching or Volunteering Experience,
                    Experience with Children with Special Needs)"
                    value={props.skills}
                    setValue={props.setSkills}
                    placeholder="Type here"
                    longAnswer={true}
                ></TextField>
                <TextField
                    name="How Did You Hear About this Volunteer Opportunity?"
                    value={props.heardFrom}
                    setValue={props.setHeardFrom}
                    placeholder="Type here"
                    longAnswer={true}
                ></TextField>
            </VStack>
            <CheckBoxField
                value={props.certifyCommit}
                name={
                    "I certify that I will commit to attending all volunteer sessions I sign up for"
                }
                setValue={props.setCertifyCommit}
            ></CheckBoxField>
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
                    disabled={!props.heardFrom || !props.certifyCommit || !props.skills}
                    onClick={props.formButtonOnClick}
                >
                    Next
                </Button>
            </Box>
        </>
    );
};
