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
    required?: boolean;
};

export const PostalCodeField: React.FC<Props> = ({
    value,
    setValue,
    name,
    required = true,
}): JSX.Element => {
    return (
        <FormControl
            style={{ height: "50px" }}
            isRequired={required}
            isInvalid={!validator.isPostalCode(value || "", "CA") && required}
        >
            <FormLabel>{name}</FormLabel>
            <Input
                placeholder="V6Z 2E6"
                onChange={(e) => setValue(e.target.value)}
                value={value}
            />
            <FormErrorMessage>
                {value ? "Invalid " + name : "Required"}
            </FormErrorMessage>
        </FormControl>
    );
};
