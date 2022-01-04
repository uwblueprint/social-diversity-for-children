import React from "react";
import { HStack, Button, Box } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import "react-datepicker/dist/react-datepicker.css";
import validator from "validator";
import { PostalCodeField } from "@components/formFields/PostalCodeField";
import { TextField } from "@components/formFields/TextField";
import { ProvinceField } from "@components/formFields/ProvinceField";
import { CheckBoxField } from "@components/formFields/CheckBoxField";
import { DateField } from "@components/formFields/DateField";
import { useTranslation } from "next-i18next";
import moment from "moment";

type VolunteerDetailsPageProps = {
    styleProps?: Record<string, unknown>;
    props: VolunteerDetailsInfo;
};

type VolunteerDetailsInfo = {
    dateOfBirth: string;
    setDateOfBirth: (text: string) => void;
    certifyAge15: boolean;
    setCertifyAge15: (value: boolean) => void;
    address1: string;
    setAddress1: (text: string) => void;
    city: string;
    setCity: (text: string) => void;
    participantProvince: any;
    setParticipantProvince: (text: any) => void;
    postalCode: string;
    setPostalCode: (text: string) => void;
    school: string;
    setSchool: (text: string) => void;
    formButtonOnClick: () => void;
};

export const VolunteerDetailsPage: React.FC<VolunteerDetailsPageProps> = ({
    props,
}): JSX.Element => {
    const { t } = useTranslation("form");

    return (
        <>
            <DateField
                name={t("label.dateOfBirth")}
                value={props.dateOfBirth}
                setValue={props.setDateOfBirth}
            />
            <CheckBoxField
                value={props.certifyAge15}
                name={t("signUp.certifyVolunteerAge")}
                setValue={props.setCertifyAge15}
                edit={moment().diff(props.dateOfBirth, "years") >= 15}
            ></CheckBoxField>
            <TextField
                name={t("label.address1")}
                value={props.address1}
                setValue={props.setAddress1}
                placeholder="815 Hornby St."
            ></TextField>
            <HStack spacing="24px" style={{ height: 100 }}>
                <TextField
                    name={t("label.city")}
                    value={props.city}
                    setValue={props.setCity}
                    placeholder="Vancouver"
                ></TextField>
                <ProvinceField
                    name={t("label.province")}
                    value={props.participantProvince}
                    setValue={props.setParticipantProvince}
                ></ProvinceField>
                <PostalCodeField
                    value={props.postalCode}
                    setValue={props.setPostalCode}
                    name={t("label.postalCode")}
                ></PostalCodeField>
            </HStack>
            <TextField
                name={t("label.school")}
                value={props.school}
                setValue={props.setSchool}
                placeholder="Westmount Secondary School"
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
                    disabled={
                        !validator.isPostalCode(props.postalCode, "CA") ||
                        !props.certifyAge15 ||
                        !props.dateOfBirth ||
                        !props.address1 ||
                        !props.city ||
                        !props.participantProvince
                    }
                    onClick={props.formButtonOnClick}
                >
                    {t("form.next")}
                </Button>
            </Box>
        </>
    );
};
