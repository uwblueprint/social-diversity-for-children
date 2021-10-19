import React, { useState } from "react";
import { HStack, Button, Box, Text, VStack } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import validator from "validator";
import { TextField } from "@components/formFields/TextField";
import { PhoneNumberField } from "@components/formFields/PhoneNumberField";
import { PostalCodeField } from "@components/formFields/PostalCodeField";
import { ProvinceField } from "@components/formFields/ProvinceField";
import { DateField } from "@components/formFields/DateField";

type VolunteerPageProps = {
    styleProps?: Record<string, unknown>;
    props: VolunteerInfo;
};

type VolunteerInfo = {
    me: any;
    save: (participant: any) => void;
    edit: boolean;
};
export const VolunteerInfo: React.FC<VolunteerPageProps> = ({
    props,
}): JSX.Element => {
    const [firstName, setFirstName] = useState(props.me.firstName);
    const [lastName, setLastName] = useState(props.me.lastName);

    const [phoneNumber, setPhoneNumber] = useState(
        props.me.volunteer.phoneNumber,
    );
    const [dateOfBirth, setDateOfBirth] = useState(
        props.me.volunteer.dateOfBirth,
    );
    const [address, setAddress] = useState(props.me.volunteer.addressLine1);
    const [city, setCity] = useState(props.me.volunteer.cityName);
    const [participantProvince, setParticipantProvince] = useState(
        props.me.volunteer.province,
    );
    const [postalCode, setPostalCode] = useState(props.me.volunteer.postalCode);
    const [school, setSchool] = useState(props.me.volunteer.school);
    const [skills, setSkills] = useState(props.me.volunteer.skills);
    const [heardFrom, setHeardFrom] = useState(props.me.volunteer.heardAboutUs);

    const save = () => {
        //Put into proper format
        const data = {
            firstName,
            lastName,
            phoneNumber,
            dateOfBirth,
            address,
            city,
            participantProvince,
            postalCode,
            school,
            skills,
            heardFrom,
        };
        props.save(data);
    };
    return (
        <>
            <br />
            <HStack spacing="24px" style={{ height: "100px" }}>
                <TextField
                    name="Volunteer First Name"
                    value={firstName}
                    setValue={setFirstName}
                    edit={props.edit}
                ></TextField>
                <TextField
                    name="Volunteer Name"
                    value={lastName}
                    setValue={setLastName}
                    edit={props.edit}
                ></TextField>
            </HStack>
            <br />
            <PhoneNumberField
                name="Phone Number"
                value={phoneNumber}
                setValue={setPhoneNumber}
                edit={props.edit}
            ></PhoneNumberField>
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
                value={address}
                setValue={setAddress}
                placeholder="815 Hornby St."
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
            <VStack>
                <TextField
                    name="Skills/Experience (ex. Arts and Crafts, Music, First-Aid
                    Certificates, Teaching or Volunteering Experience,
                    Experience with Children with Special Needs)"
                    value={skills}
                    setValue={setSkills}
                    placeholder="Type here"
                    longAnswer={true}
                ></TextField>
                <TextField
                    name="How Did You Hear About this Volunteer Opportunity?"
                    value={heardFrom}
                    setValue={setHeardFrom}
                    placeholder="Type here"
                    longAnswer={true}
                ></TextField>
            </VStack>
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
                            !firstName ||
                            !lastName ||
                            !dateOfBirth ||
                            !address ||
                            !city ||
                            !participantProvince ||
                            !validator.isPostalCode(postalCode, "CA") ||
                            !validator.isMobilePhone(phoneNumber)
                        }
                        onClick={save}
                    >
                        Save Changes
                    </Button>
                ) : null}
            </Box>
        </>
    );
};
