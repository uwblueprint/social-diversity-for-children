import React from "react";
import { HStack, Box, Button } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import validator from "validator";
import { TextField } from "@components/formFields/TextField";
import { PhoneNumberField } from "@components/formFields/PhoneNumberField";
import { useTranslation } from "next-i18next";

type VolunteerInfoPageProps = {
    styleProps?: Record<string, unknown>;
    props: VolunteerInfo;
};

type VolunteerInfo = {
    volunteerFirstName: string;
    setVolunteerFirstName: (text: string) => void;
    volunteerLastName: string;
    setVolunteerLastName: (text: string) => void;
    phoneNumber: string;
    setPhoneNumber: (text: string) => void;
    formButtonOnClick: () => void;
};
export const VolunteerInfoPage: React.FC<VolunteerInfoPageProps> = ({ props }): JSX.Element => {
    const { t } = useTranslation("form");

    return (
        <>
            <HStack spacing="24px" style={{ height: 100 }}>
                <TextField
                    name={t("label.firstName")}
                    value={props.volunteerFirstName}
                    setValue={props.setVolunteerFirstName}
                ></TextField>
                <TextField
                    name={t("label.lastName")}
                    value={props.volunteerLastName}
                    setValue={props.setVolunteerLastName}
                ></TextField>
            </HStack>
            <PhoneNumberField
                name={t("label.phone")}
                value={props.phoneNumber}
                setValue={props.setPhoneNumber}
            ></PhoneNumberField>
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
                        !validator.isMobilePhone(props.phoneNumber) ||
                        !props.volunteerFirstName ||
                        !props.setVolunteerLastName
                    }
                    onClick={props.formButtonOnClick}
                >
                    {t("form.next")}
                </Button>
            </Box>
        </>
    );
};
