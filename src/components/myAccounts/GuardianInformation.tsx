import React, { useState } from "react";
import { HStack, Button, Box, Text } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import validator from "validator";
import { TextField } from "@components/formFields/TextField";
import { CheckBoxField } from "@components/formFields/CheckBoxField";
import { PhoneNumberField } from "@components/formFields/PhoneNumberField";

type GuardianPageProps = {
    styleProps?: Record<string, unknown>;
    props: GuardianInfo;
};

type GuardianInfo = {
    me: any;
    save: (participant: string) => void;
    edit: boolean;
};
export const GuardianInfo: React.FC<GuardianPageProps> = ({
    props,
}): JSX.Element => {
    const [name, setName] = useState(
        props.me.firstName + " " + props.me.lastName,
    );
    const [phoneNumber, setPhoneNumber] = useState("");
    const [relationship, setRelationship] = useState("");

    const save = () => {
        //Put into proper format
        //Call parent props.save(data)
    };
    return (
        <>
            <br />
            <TextField
                name="Parent/Guardian First Name"
                value={name}
                setValue={setName}
                edit={props.edit}
            ></TextField>
            <br />
            <br />
            <PhoneNumberField
                name="Phone Number"
                value={phoneNumber}
                setValue={setPhoneNumber}
                edit={props.edit}
            ></PhoneNumberField>
            <br />
            <br />
            <TextField
                name="Relationship to participant"
                value={relationship}
                setValue={setRelationship}
                edit={props.edit}
            ></TextField>
        </>
    );
};
