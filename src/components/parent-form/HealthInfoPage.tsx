import { Box, Button, Text } from "@chakra-ui/react";
import { CheckBoxField } from "@components/formFields/CheckBoxField";
import { TextField } from "@components/formFields/TextField";
import colourTheme from "@styles/colours";
import React from "react";
import { useTranslation } from "react-i18next";

type HealthPageProps = {
    styleProps?: Record<string, unknown>;
    props: HealthInfo;
};

type HealthInfo = {
    hasMedication: boolean;
    setHasMedication: (value: boolean) => void;
    hasAllergies: boolean;
    setHasAllergies: (value: boolean) => void;

    medication: string;
    setMedication: (text: string) => void;
    allergies: string;
    setAllergies: (text: string) => void;
    formButtonOnClick: () => void;
};
export const HealthInfoPage: React.FC<HealthPageProps> = ({ props }): JSX.Element => {
    const { t } = useTranslation("form");

    return (
        <>
            <Box maxW="55rem">
                <Text fontSize="16px" fontWeight="200">
                    {t("signUp.healthFormInfo")}
                </Text>
            </Box>
            <CheckBoxField
                value={props.hasMedication}
                name={t("signUp.medication")}
                setValue={props.setHasMedication}
                required={false}
            ></CheckBoxField>
            <TextField
                name={t("label.details")}
                value={props.medication}
                setValue={props.setMedication}
                placeholder="Details"
                required={false}
            ></TextField>
            <CheckBoxField
                value={props.hasAllergies}
                name={t("signUp.allergies")}
                setValue={props.setHasAllergies}
                required={false}
            ></CheckBoxField>
            <TextField
                name={t("label.details")}
                value={props.allergies}
                setValue={props.setAllergies}
                placeholder="Details"
                required={false}
            ></TextField>
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
                    disabled={false}
                    onClick={props.formButtonOnClick}
                >
                    {t("form.next")}
                </Button>
            </Box>
        </>
    );
};
