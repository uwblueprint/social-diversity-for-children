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
    return (
        <>
            <DateField
                name={"Date Of Birth"}
                value={props.dateOfBirth}
                setValue={props.setDateOfBirth}
            />
            <CheckBoxField
                value={props.certifyAge15}
                name={" I certify that I am over the age of 15 in order to volunteer with SDC"}
                setValue={props.setCertifyAge15}
            ></CheckBoxField>
            <TextField
                name="Street Address"
                value={props.address1}
                setValue={props.setAddress1}
                placeholder="815 Hornby St."
            ></TextField>
            <HStack spacing="24px" style={{ height: 100 }}>
                <TextField
                    name="City"
                    value={props.city}
                    setValue={props.setCity}
                    placeholder="Vancouver"
                ></TextField>
                <ProvinceField
                    name="Province"
                    value={props.participantProvince}
                    setValue={props.setParticipantProvince}
                ></ProvinceField>
                <PostalCodeField
                    value={props.postalCode}
                    setValue={props.setPostalCode}
                    name="Postal Code"
                ></PostalCodeField>
            </HStack>
            <TextField
                name="School (if applicable)"
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
                    Next
                </Button>
            </Box>
        </>
    );
};
