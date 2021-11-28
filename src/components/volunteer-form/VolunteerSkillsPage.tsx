import React from "react";
import { VStack, Button, Box } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import { TextField } from "@components/formFields/TextField";
import { CheckBoxField } from "@components/formFields/CheckBoxField";
import { useTranslation } from "react-i18next";

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

export const VolunteerSkillsPage: React.FC<VolunteerSkillsPageProps> = ({
    props,
}): JSX.Element => {
    const { t } = useTranslation("form");

    return (
        <>
            <VStack>
                <TextField
                    name={t("signUp.skillsAndExperience")}
                    value={props.skills}
                    setValue={props.setSkills}
                    placeholder="Type here"
                    longAnswer={true}
                ></TextField>
                <TextField
                    name={t("signUp.hearAboutVolunteer")}
                    value={props.heardFrom}
                    setValue={props.setHeardFrom}
                    placeholder="Type here"
                    longAnswer={true}
                ></TextField>
                <CheckBoxField
                    value={props.certifyCommit}
                    name={t("signUp.certifyVolunteerAttendance")}
                    setValue={props.setCertifyCommit}
                    spacing={false}
                ></CheckBoxField>
            </VStack>
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
                    {t("form.next")}
                </Button>
            </Box>
        </>
    );
};
