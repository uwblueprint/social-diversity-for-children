import React, { useState } from "react";
import { HStack, Button, Box, VStack } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import validator from "validator";
import { TextField } from "@components/formFields/TextField";
import { PhoneNumberField } from "@components/formFields/PhoneNumberField";
import { PostalCodeField } from "@components/formFields/PostalCodeField";
import { ProvinceField } from "@components/formFields/ProvinceField";
import { DateField } from "@components/formFields/DateField";
import { useTranslation } from "react-i18next";

type VolunteerPageProps = {
    styleProps?: Record<string, unknown>;
    props: VolunteerInfo;
};

type VolunteerInfo = {
    me: any;
    save: (volunteer: any) => void;
    edit: boolean;
};
export const VolunteerInfo: React.FC<VolunteerPageProps> = ({ props }): JSX.Element => {
    const { t } = useTranslation("common");

    const [firstName, setFirstName] = useState(props.me.firstName);
    const [lastName, setLastName] = useState(props.me.lastName);

    const [phoneNumber, setPhoneNumber] = useState(props.me.volunteer.phoneNumber);
    const [dateOfBirth, setDateOfBirth] = useState(props.me.volunteer.dateOfBirth);
    const [addressLine1, setAddressLine1] = useState(props.me.volunteer.addressLine1);
    const [cityName, setCityName] = useState(props.me.volunteer.cityName);
    const [province, setProvince] = useState(props.me.volunteer.province);
    const [postalCode, setPostalCode] = useState(props.me.volunteer.postalCode);
    const [school, setSchool] = useState(props.me.volunteer.school);
    const [skills, setSkills] = useState(props.me.volunteer.skills);
    const [hearAboutUs, setHearAboutUs] = useState(props.me.volunteer.hearAboutUs);

    const save = () => {
        //Put into proper format
        const data = {
            firstName,
            lastName,
            phoneNumber,
            dateOfBirth,
            addressLine1,
            cityName,
            province,
            postalCode,
            school,
            skills,
            hearAboutUs,
        };
        props.save(data);
    };
    return (
        <>
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
                value={addressLine1}
                setValue={setAddressLine1}
                placeholder="815 Hornby St."
                edit={props.edit}
            ></TextField>
            <br />

            <HStack spacing="24px" style={{ height: 100 }}>
                <TextField
                    name="City"
                    value={cityName}
                    setValue={setCityName}
                    placeholder="Vancouver"
                    edit={props.edit}
                ></TextField>
                <ProvinceField
                    name="Province"
                    value={province}
                    setValue={setProvince}
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
            <VStack spacing={9}>
                <TextField
                    name="Skills/Experience (ex. Arts and Crafts, Music, First-Aid
                    Certificates, Teaching or Volunteering Experience,
                    Experience with Children with Special Needs)"
                    value={skills}
                    setValue={setSkills}
                    placeholder="Type here"
                    longAnswer={true}
                    edit={props.edit}
                ></TextField>
                <TextField
                    name="How Did You Hear About this Volunteer Opportunity?"
                    value={hearAboutUs}
                    setValue={setHearAboutUs}
                    placeholder="Type here"
                    longAnswer={true}
                    edit={props.edit}
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
                        disabled={
                            !firstName ||
                            !lastName ||
                            !dateOfBirth ||
                            !addressLine1 ||
                            !cityName ||
                            !province ||
                            !validator.isPostalCode(postalCode, "CA") ||
                            !validator.isMobilePhone(phoneNumber)
                        }
                        onClick={save}
                    >
                        {t("account.save")}
                    </Button>
                ) : null}
            </Box>
        </>
    );
};
