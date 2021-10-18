import React, { useState } from "react";
import { HStack, Button, Box, Text } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import validator from "validator";
import { CheckBoxField } from "@components/formFields/CheckBoxField";
import { PostalCodeField } from "@components/formFields/PostalCodeField";
import { TextField } from "@components/formFields/TextField";
import { ProvinceField } from "@components/formFields/ProvinceField";
import { DateField } from "@components/formFields/DateField";

type ParticipantPageProps = {
    styleProps?: Record<string, unknown>;
    props: ParticipantInfo;
};

type ParticipantInfo = {
    student: any;
};
export const ParticipantInfo: React.FC<ParticipantPageProps> = ({
    props,
}): JSX.Element => {
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [address1, setAddress1] = useState(null);
    const [address2, setAddress2] = useState(null);
    const [city, setCity] = useState(null);
    const [participantProvince, setParticipantProvince] = useState(null);
    const [postalCode, setPostalCode] = useState(null);
    const [school, setSchool] = useState(null);
    const [grade, setGrade] = useState(null);
    const [participantFirstName, setParticipantFirstName] = useState(
        props.student.firstName,
    );
    const [participantLastName, setParticipantLastName] = useState(
        props.student.lastName,
    );

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
                    ></TextField>
                    <TextField
                        name="Last Name"
                        value={participantLastName}
                        setValue={setParticipantLastName}
                    ></TextField>
                </HStack>
                <br />
                <DateField
                    name={"Date Of Birth"}
                    value={dateOfBirth}
                    setValue={setDateOfBirth}
                />
                <br />
                <br />
                <TextField
                    name="Street Address"
                    value={address1}
                    setValue={setAddress1}
                    placeholder="815 Hornby St."
                ></TextField>
                <br />
                <br />
                <TextField
                    name="Street Address 2"
                    value={address2}
                    setValue={setAddress2}
                    placeholder="815 Hornby St."
                    required={false}
                ></TextField>
                <br />
                <HStack spacing="24px" style={{ height: 100 }}>
                    <TextField
                        name="City"
                        value={city}
                        setValue={setCity}
                        placeholder="Vancouver"
                    ></TextField>
                    <ProvinceField
                        name="Province"
                        value={participantProvince}
                        setValue={setParticipantProvince}
                    ></ProvinceField>
                    <PostalCodeField
                        value={postalCode}
                        setValue={setPostalCode}
                        name="Postal Code"
                    ></PostalCodeField>
                </HStack>
                <br />
                <TextField
                    name="School (if applicable)"
                    value={school}
                    setValue={setSchool}
                    placeholder="Vancouver"
                    required={false}
                ></TextField>
                <br />
                <br />
                <TextField
                    name="Grade (if applicable)"
                    value={grade}
                    setValue={setGrade}
                    placeholder="5"
                    required={false}
                ></TextField>
                <br />
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
                </Box>
            </>
        </>
    );
};
