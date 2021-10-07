import React from "react";
import { HStack, Button, Box, Text } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import validator from "validator";
import { TextField } from "@components/formFields/TextField";
import { PhoneNumberField } from "@components/formFields/PhoneNumberField";

type EmergPageProps = {
    styleProps?: Record<string, unknown>;
    props: EmergInfo;
};

type EmergInfo = {
    emergFirstName: string;
    setEmergFirstName: (text: string) => void;
    emergLastName: string;
    setEmergLastName: (text: string) => void;
    emergPhoneNumber: string;
    setEmergPhoneNumber: (text: string) => void;
    emergRelationship: string;
    setEmergRelationship: (text: string) => void;
    formButtonOnClick: () => void;
};
export const EmergInfoPage: React.FC<EmergPageProps> = ({
    props,
}): JSX.Element => {
    return (
        <>
            <Box maxW="55rem">
                <Text noOfLines={2} fontSize="16px" fontWeight="200">
                    The information on this form will be used at the discretion
                    of the activity instructor/coordinator to ensure care and
                    attention is given to the safety and health of your child.
                    All information on this form is considered Personal and
                    Confidential. The contact listed on the emergency form
                    cannot be the same contact listed as the parent above.
                </Text>
            </Box>
            <HStack spacing="24px" style={{ height: 100 }}>
                <TextField
                    name="Emergency Contact First Name"
                    value={props.emergFirstName}
                    setValue={props.setEmergFirstName}
                ></TextField>
                <TextField
                    name="Emergency Contact Last Name"
                    value={props.emergLastName}
                    setValue={props.setEmergLastName}
                ></TextField>
            </HStack>
            <PhoneNumberField
                name="Emergency Contact Phone Number"
                value={props.emergPhoneNumber}
                setValue={props.setEmergPhoneNumber}
            ></PhoneNumberField>
            <br />
            <TextField
                name="Emergency Contact Relationship to Participant"
                placeholder="Mother"
                value={props.emergRelationship}
                setValue={props.setEmergRelationship}
            ></TextField>
            <div>
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
                        !validator.isMobilePhone(props.emergPhoneNumber) ||
                        !props.emergFirstName ||
                        !props.emergLastName ||
                        !props.emergRelationship
                    }
                    onClick={props.formButtonOnClick}
                >
                    Next
                </Button>
            </div>
        </>
    );
};
