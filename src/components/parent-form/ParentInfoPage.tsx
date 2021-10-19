import React from "react";
import { HStack, Button, Box } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import validator from "validator";
import { TextField } from "@components/formFields/TextField";
import { PhoneNumberField } from "@components/formFields/PhoneNumberField";

type ParentPageProps = {
    styleProps?: Record<string, unknown>;
    props: ParentInfo;
};

type ParentInfo = {
    parentFirstName: string;
    setParentFirstName: (text: string) => void;
    parentLastName: string;
    setParentLastName: (text: string) => void;
    parentPhoneNumber: string;
    setParentPhoneNumber: (text: string) => void;
    parentRelationship: string;
    setParentRelationship: (text: string) => void;
    formButtonOnClick: () => void;
};
export const ParentInfoPage: React.FC<ParentPageProps> = ({
    props,
}): JSX.Element => {
    return (
        <>
            <HStack spacing="24px" style={{ height: 100 }}>
                <TextField
                    name="Parent/Guardian First Name"
                    placeholder="John"
                    value={props.parentFirstName}
                    setValue={props.setParentFirstName}
                ></TextField>
                <TextField
                    name="Parent/Guardian Last Name"
                    placeholder="Doe"
                    value={props.parentLastName}
                    setValue={props.setParentLastName}
                ></TextField>
            </HStack>
            <PhoneNumberField
                name="Phone Number"
                placeholder="2893491048"
                value={props.parentPhoneNumber}
                setValue={props.setParentPhoneNumber}
            ></PhoneNumberField>
            <br />
            <TextField
                name="Relationship to Participant"
                placeholder="Mother"
                value={props.parentRelationship}
                setValue={props.setParentRelationship}
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
                        !validator.isMobilePhone(props.parentPhoneNumber) ||
                        !props.parentFirstName ||
                        !props.parentLastName ||
                        !props.parentRelationship
                    }
                    onClick={props.formButtonOnClick}
                >
                    Next
                </Button>
            </Box>
        </>
    );
};
