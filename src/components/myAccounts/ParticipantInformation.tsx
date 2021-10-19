import React, { useState } from "react";
import { HStack, Button, Box, Text } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import validator from "validator";
import { PostalCodeField } from "@components/formFields/PostalCodeField";
import { TextField } from "@components/formFields/TextField";
import { ProvinceField } from "@components/formFields/ProvinceField";
import { DateField } from "@components/formFields/DateField";
import "react-datepicker/dist/react-datepicker.css";

type ParticipantPageProps = {
    styleProps?: Record<string, unknown>;
    props: ParticipantInfo;
};

type ParticipantInfo = {
    student: any;
    save: (participant: any) => void;
    edit: boolean;
};
export const ParticipantInfo: React.FC<ParticipantPageProps> = ({
    props,
}): JSX.Element => {
    console.log(props.student);
    const [dateOfBirth, setDateOfBirth] = useState(props.student.dateOfBirth);
    const [address1, setAddress1] = useState(props.student.addressLine1);
    const [address2, setAddress2] = useState(props.student.addressLine2);
    const [city, setCity] = useState(props.student.cityName);
    const [participantProvince, setParticipantProvince] = useState(
        props.student.province,
    );
    const [postalCode, setPostalCode] = useState(props.student.postalCode);
    const [school, setSchool] = useState(props.student.school);
    const [grade, setGrade] = useState(props.student.grade);
    const [participantFirstName, setParticipantFirstName] = useState(
        props.student.firstName,
    );
    const [participantLastName, setParticipantLastName] = useState(
        props.student.lastName,
    );

    const save = () => {
        const data = {
            dateOfBirth,
            address1,
            address2,
            city,
            participantProvince,
            postalCode,
            school,
            grade,
            participantFirstName,
            participantLastName,
        };
        props.save(data);
        //Put into proper format
        //Call parent props.save(data)
    };

    return (
        <>
            <Box maxW="55rem">
                <Text noOfLines={2} fontSize="16px" fontWeight="200">
                    Please provide information on the participant that is being
                    registered in the program. An opportunity to add information
                    of additional participants you would like to register will
                    be provided afterwards.
                </Text>
            </Box>
            <>
                <HStack spacing="24px" style={{ height: "100px" }}>
                    <TextField
                        name="First Name"
                        value={participantFirstName}
                        setValue={setParticipantFirstName}
                        edit={props.edit}
                    ></TextField>
                    <TextField
                        name="Last Name"
                        value={participantLastName}
                        setValue={setParticipantLastName}
                        edit={props.edit}
                    ></TextField>
                </HStack>
                <br />
                <DateField
                    name={"Date Of Birth"}
                    value={dateOfBirth}
                    setValue={setDateOfBirth}
                    edit={props.edit}
                />
                <br />
                <br />
                <TextField
                    name="Street Address"
                    value={address1}
                    setValue={setAddress1}
                    placeholder="815 Hornby St."
                    edit={props.edit}
                ></TextField>
                <br />
                <br />
                <TextField
                    name="Street Address 2"
                    value={address2}
                    setValue={setAddress2}
                    placeholder="815 Hornby St."
                    required={false}
                    edit={props.edit}
                ></TextField>
                <br />
                <HStack spacing="24px" style={{ height: 100 }}>
                    <TextField
                        name="City"
                        value={city}
                        setValue={setCity}
                        placeholder="Vancouver"
                        edit={props.edit}
                    ></TextField>
                    <ProvinceField
                        name="Province"
                        value={participantProvince}
                        setValue={setParticipantProvince}
                        edit={props.edit}
                    ></ProvinceField>
                    <PostalCodeField
                        value={postalCode}
                        setValue={setPostalCode}
                        name="Postal Code"
                        edit={props.edit}
                    ></PostalCodeField>
                </HStack>
                <br />
                <TextField
                    name="School (if applicable)"
                    value={school}
                    setValue={setSchool}
                    placeholder="Vancouver"
                    required={false}
                    edit={props.edit}
                ></TextField>
                <br />
                <br />
                <TextField
                    name="Grade (if applicable)"
                    value={grade}
                    setValue={setGrade}
                    placeholder="5"
                    required={false}
                    edit={props.edit}
                ></TextField>
                <br />
                <Box>
                    {props.edit ? (
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
                                !participantFirstName ||
                                !participantLastName ||
                                !dateOfBirth ||
                                !address1 ||
                                !city ||
                                !participantProvince ||
                                !validator.isPostalCode(postalCode, "CA")
                            }
                            onClick={save}
                        >
                            Save Changes
                        </Button>
                    ) : null}
                </Box>
            </>
        </>
    );
};
