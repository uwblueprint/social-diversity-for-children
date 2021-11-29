import React from "react";
import { HStack, Button, Box, Text } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import validator from "validator";
import { TextField } from "@components/formFields/TextField";
import { PhoneNumberField } from "@components/formFields/PhoneNumberField";
import { useTranslation } from "react-i18next";

type EmergPageProps = {
    styleProps?: Record<string, unknown>;
    props: EmergInfo;
};

type EmergInfo = {
    emergFirstName: string;
    setEmergFirstName: (text: string) => void;
    emergLastName: string;
    setEmergLastName: (text: string) => void;
    emergPhoneNumber: string;
    setEmergPhoneNumber: (text: string) => void;
    emergRelationship: string;
    setEmergRelationship: (text: string) => void;
    formButtonOnClick: () => void;
};
export const EmergInfoPage: React.FC<EmergPageProps> = ({ props }): JSX.Element => {
    const { t } = useTranslation("form");

    return (
        <>
            <Box maxW="55rem">
                <Text fontSize="16px" fontWeight="200">
                    {t("signUp.emergencyFormInfo")}
                </Text>
            </Box>
            <HStack spacing="24px" style={{ height: 100 }}>
                <TextField
                    name={t("label.emergencyFirstName")}
                    placeholder="John"
                    value={props.emergFirstName}
                    setValue={props.setEmergFirstName}
                ></TextField>
                <TextField
                    name={t("label.emergencyLastName")}
                    placeholder="Doe"
                    value={props.emergLastName}
                    setValue={props.setEmergLastName}
                ></TextField>
            </HStack>
            <PhoneNumberField
                name={t("label.emergencyPhone")}
                placeholder="2893491048"
                value={props.emergPhoneNumber}
                setValue={props.setEmergPhoneNumber}
            ></PhoneNumberField>
            <br />
            <TextField
                name={t("label.relation")}
                placeholder="Mother"
                value={props.emergRelationship}
                setValue={props.setEmergRelationship}
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
                    disabled={
                        !validator.isMobilePhone(props.emergPhoneNumber) ||
                        !props.emergFirstName ||
                        !props.emergLastName ||
                        !props.emergRelationship
                    }
                    onClick={props.formButtonOnClick}
                >
                    {t("form.next")}
                </Button>
            </Box>
        </>
    );
};
