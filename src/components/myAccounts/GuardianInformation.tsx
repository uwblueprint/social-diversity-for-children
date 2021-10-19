import React, { useState } from "react";
import { HStack, Button, Box, Text } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import validator from "validator";
import { TextField } from "@components/formFields/TextField";
import { PhoneNumberField } from "@components/formFields/PhoneNumberField";

type GuardianPageProps = {
    styleProps?: Record<string, unknown>;
    props: GuardianInfo;
};

type GuardianInfo = {
    me: any;
    save: (participant: any) => void;
    edit: boolean;
};
export const GuardianInfo: React.FC<GuardianPageProps> = ({
    props,
}): JSX.Element => {
    const [firstName, setFirstName] = useState(props.me.firstName);
    const [lastName, setLastName] = useState(props.me.lastName);
    const [phoneNumber, setPhoneNumber] = useState(props.me.parent.phoneNumber);
    const save = () => {
        //Put into proper format
        const data = {
            firstName,
            lastName,
            phoneNumber,
        };
        props.save(data);
    };
    return (
        <>
            <br />
            <HStack spacing="24px" style={{ height: "100px" }}>
                <TextField
                    name="Parent/Guardian First Name"
                    value={firstName}
                    setValue={setFirstName}
                    edit={props.edit}
                ></TextField>
                <TextField
                    name="Parent/GuardianLast Name"
                    value={lastName}
                    setValue={setLastName}
                    edit={props.edit}
                ></TextField>
            </HStack>
            <br />
            <br />
            <PhoneNumberField
                name="Phone Number"
                value={phoneNumber}
                setValue={setPhoneNumber}
                edit={props.edit}
            ></PhoneNumberField>
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
                            !phoneNumber ||
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
