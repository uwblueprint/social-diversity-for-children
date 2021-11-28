import React from "react";
import { Box, Text, HStack, Button } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import colourTheme from "@styles/colours";
import { PostalCodeField } from "@components/formFields/PostalCodeField";
import { TextField } from "@components/formFields/TextField";
import { ProvinceField } from "@components/formFields/ProvinceField";
import { DateField } from "@components/formFields/DateField";
import validator from "validator";

// pass in props then do props.participant Name, etc...
type ParticipantPageProps = {
    styleProps?: Record<string, unknown>;
    props: ParticipantInfo;
};

type ParticipantInfo = {
    participantFirstName: string;
    setParticipantFirstName: (text: string) => void;
    participantLastName: string;
    setParticipantLastName: (text: string) => void;
    dateOfBirth: string;
    setDateOfBirth: (text: string) => void;
    address1: string;
    setAddress1: (text: string) => void;
    address2: string;
    setAddress2: (text: string) => void;
    city: string;
    setCity: (text: string) => void;
    participantProvince: any;
    setParticipantProvince: (text: any) => void;
    postalCode: string;
    setPostalCode: (text: string) => void;
    school: string;
    setSchool: (text: string) => void;
    grade: string;
    setGrade: (text: string) => void;
    formButtonOnClick: () => void;
};
export const ParticipantInfoPage: React.FC<ParticipantPageProps> = ({ props }): JSX.Element => {
    return (
        <>
            <Box maxW="55rem">
                <Text noOfLines={2} fontSize="16px" fontWeight="200">
                    Please provide information on the participant that is being registered in the
                    program. An opportunity to add information of additional participants you would
                    like to register will be provided afterwards.
                </Text>
            </Box>
            <>
                <HStack spacing="24px" style={{ height: "100px" }}>
                    <TextField
                        name="First Name"
                        placeholder="John"
                        value={props.participantFirstName}
                        setValue={props.setParticipantFirstName}
                    ></TextField>
                    <TextField
                        name="Last Name"
                        placeholder="Doe"
                        value={props.participantLastName}
                        setValue={props.setParticipantLastName}
                    ></TextField>
                </HStack>
                <DateField
                    name={"Date Of Birth"}
                    value={props.dateOfBirth}
                    setValue={props.setDateOfBirth}
                />
                <br />
                <TextField
                    name="Street Address"
                    value={props.address1}
                    setValue={props.setAddress1}
                    placeholder="815 Hornby St."
                ></TextField>
                <br />
                <TextField
                    name="Street Address 2"
                    value={props.address2}
                    setValue={props.setAddress2}
                    placeholder="811 Hornby St."
                    required={false}
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
                <TextField
                    name="Grade (if applicable)"
                    value={props.grade}
                    setValue={props.setGrade}
                    placeholder="5"
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
                            !props.participantFirstName ||
                            !props.participantLastName ||
                            !props.dateOfBirth ||
                            !props.address1 ||
                            !props.city ||
                            !props.participantProvince ||
                            !validator.isPostalCode(props.postalCode, "CA")
                        }
                        onClick={props.formButtonOnClick}
                    >
                        Next
                    </Button>
                </Box>
            </>
        </>
    );
};
