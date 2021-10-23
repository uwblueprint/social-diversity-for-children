import React from "react";
import { HStack, Button, Box, Text } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import validator from "validator";
import { TextField } from "@components/formFields/TextField";
import { CheckBoxField } from "@components/formFields/CheckBoxField";

type HealthPageProps = {
    styleProps?: Record<string, unknown>;
    props: HealthInfo;
};

type HealthInfo = {
    hasMedication: boolean;
    setHasMedication: (value: boolean) => void;
    hasAllergies: boolean;
    setHasAllergies: (value: boolean) => void;

    medication: string;
    setMedication: (text: string) => void;
    allergies: string;
    setAllergies: (text: string) => void;
    formButtonOnClick: () => void;
};
export const HealthInfoPage: React.FC<HealthPageProps> = ({
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
            <CheckBoxField
                value={props.hasMedication}
                name={"Is your child on medication?"}
                setValue={props.setHasMedication}
                required={false}
            ></CheckBoxField>
            <TextField
                name="If yes, please provide any details if necessary"
                value={props.medication}
                setValue={props.setMedication}
                placeholder="Details"
                required={false}
            ></TextField>
            <CheckBoxField
                value={props.hasAllergies}
                name={"Does your child have any food allergies?"}
                setValue={props.setHasAllergies}
                required={false}
            ></CheckBoxField>
            <TextField
                name="If yes, please provide any details if necessary"
                value={props.allergies}
                setValue={props.setAllergies}
                placeholder="Details"
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
                    disabled={false}
                    onClick={props.formButtonOnClick}
                >
                    Next
                </Button>
            </Box>
        </>
    );
};
