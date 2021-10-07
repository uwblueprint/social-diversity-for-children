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
};

export const CheckBoxField: React.FC<Props> = ({
    value,
    setValue,
    name,
    required = true,
}): JSX.Element => {
    return (
        <FormControl
            style={{ height: "50px", paddingTop: 25, paddingBottom: 25 }}
            isRequired={required}
            isInvalid={!value}
        >
            <Stack direction="column">
                <Checkbox
                    isChecked={value}
                    onChange={(e) => setValue(e.target.checked)}
                >
                    {name}
                </Checkbox>
            </Stack>
            <FormErrorMessage>{"Required"}</FormErrorMessage>
        </FormControl>
    );
};
