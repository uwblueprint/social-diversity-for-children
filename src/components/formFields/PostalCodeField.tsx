import React, { useState } from "react";
import { FormLabel, FormControl, Input, FormErrorMessage, Box } from "@chakra-ui/react";
import validator from "validator";

type Props = {
    value: string;
    setValue: (text: string) => void;
    name: string;
    required?: boolean;
    edit?: boolean;
};

export const PostalCodeField: React.FC<Props> = ({
    value,
    setValue,
    name,
    required = true,
    edit = true,
}): JSX.Element => {
    const [interactedWith, setInteractedWith] = useState(false);
    return (
        <FormControl
            style={{ height: "50px" }}
            isRequired={required && edit}
            isInvalid={
                !validator.isPostalCode(value || "", "CA") &&
                required &&
                interactedWith &&
                edit
            }
        >
            <FormLabel>{name}</FormLabel>
            {!edit ? (
                <p>{value}</p>
            ) : (
                <Box>
                    <Input
                        placeholder="V6Z 2E6"
                        onChange={(e) => {
                            setValue(e.target.value);
                            setInteractedWith(true);
                        }}
                        value={value}
                    />
                    <FormErrorMessage>
                        {value ? "Invalid " + name : "Required"}
                    </FormErrorMessage>
                </Box>
            )}
        </FormControl>
    );
};
