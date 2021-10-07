import React from "react";
import {
    FormLabel,
    FormControl,
    Input,
    FormErrorMessage,
} from "@chakra-ui/react";
import validator from "validator";

type Props = {
    value: string;
    setValue: (text: string) => void;
    name: string;
    placeholder?: string;
    required?: boolean;
};

export const PhoneNumberField: React.FC<Props> = ({
    value,
    setValue,
    name,
    placeholder,
    required = true,
}): JSX.Element => {
    return (
        <FormControl
            style={{ height: "50px" }}
            isRequired={required}
            isInvalid={!validator.isMobilePhone(value) && required}
        >
            {" "}
            <FormLabel>{name}</FormLabel>
            <Input
                placeholder={placeholder || name}
                onChange={(e) => setValue(e.target.value)}
                value={value}
            />
            <FormErrorMessage>
                {value ? "Invalid Phone Number" : "Required"}
            </FormErrorMessage>
        </FormControl>
    );
};
