import React, { useState } from "react";
import { FormLabel, FormControl, Input, FormErrorMessage, Box } from "@chakra-ui/react";
import validator from "validator";

type Props = {
    value: string;
    setValue: (text: string) => void;
    name: string;
    placeholder?: string;
    required?: boolean;
    edit?: boolean;
};

export const PhoneNumberField: React.FC<Props> = ({
    value,
    setValue,
    name,
    placeholder,
    required = true,
    edit = true,
}): JSX.Element => {
    const [interactedWith, setInteractedWith] = useState(false);
    return (
        <FormControl
            style={{ height: "50px" }}
            isRequired={required && edit}
            isInvalid={!validator.isMobilePhone(value || "") && required && interactedWith && edit}
        >
            {" "}
            <FormLabel>{name}</FormLabel>
            {!edit ? (
                <p>{value}</p>
            ) : (
                <Box>
                    <Input
                        placeholder={placeholder || name}
                        onChange={(e) => {
                            setValue(e.target.value);
                            setInteractedWith(true);
                        }}
                        value={value}
                    />
                    <FormErrorMessage>
                        {value ? "Invalid Phone Number" : "Required"}
                    </FormErrorMessage>
                </Box>
            )}
        </FormControl>
    );
};
