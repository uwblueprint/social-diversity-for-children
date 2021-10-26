import React from "react";
import {
    FormErrorMessage,
    Stack,
    Checkbox,
    FormControl,
} from "@chakra-ui/react";

type Props = {
    value: boolean;
    setValue: (text: boolean) => void;
    name: string;
    placeholder?: string;
    required?: boolean;
    spacing?: boolean;
    edit?: boolean;
};

export const CheckBoxField: React.FC<Props> = ({
    value,
    setValue,
    name,
    required = true,
    spacing = true,
    edit = true,
}): JSX.Element => {
    return (
        <FormControl
            style={
                spacing
                    ? { height: "50px", paddingTop: 25, paddingBottom: 25 }
                    : null
            }
            isRequired={required && edit}
            isInvalid={!value && required && edit}
        >
            <Stack direction="column">
                <Checkbox
                    isChecked={value}
                    onChange={(e) => setValue(e.target.checked)}
                    isDisabled={!edit}
                >
                    {name}
                </Checkbox>
            </Stack>
            <FormErrorMessage>{"Required"}</FormErrorMessage>
        </FormControl>
    );
};
