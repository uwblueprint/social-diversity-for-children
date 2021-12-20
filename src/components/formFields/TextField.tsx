import React, { useState } from "react";
import validator from "validator";
import {
    FormLabel,
    FormControl,
    Input,
    FormErrorMessage,
    Textarea,
    FormControlProps,
} from "@chakra-ui/react";

type Props = FormControlProps & {
    value: string;
    setValue: (text: string) => void;
    name: string;
    placeholder?: string;
    required?: boolean;
    longAnswer?: boolean;
    edit?: boolean;
    number?: boolean;
};

export const TextField: React.FC<Props> = ({
    value,
    setValue,
    name,
    placeholder,
    required = true,
    longAnswer = false,
    edit = true,
    number = false,
    ...props
}): JSX.Element => {
    const [interactedWith, setInteractedWith] = useState(false);
    const formatInput = () => {
        setValue(value.trim());
    };

    return (
        <FormControl
            style={longAnswer ? { height: "160px" } : { height: "50px" }}
            isRequired={required && edit}
            isInvalid={
                (!value && required && interactedWith && edit) ||
                (number && !validator.isNumeric(value) && interactedWith)
            }
            {...props}
        >
            <FormLabel>{name}</FormLabel>
            {!edit ? (
                <p>{value}</p>
            ) : longAnswer ? (
                <Textarea
                    placeholder={placeholder}
                    size="sm"
                    onChange={(e) => {
                        setValue(e.target.value);
                        setInteractedWith(true);
                    }}
                    value={value}
                    onBlur={formatInput}
                ></Textarea>
            ) : (
                <Input
                    placeholder={placeholder || name}
                    onChange={(e) => {
                        setValue(e.target.value);
                        setInteractedWith(true);
                    }}
                    onBlur={formatInput}
                    value={value}
                />
            )}
            <FormErrorMessage>
                {number && value && !validator.isNumeric(value) ? "Invalid Number" : "Required"}
            </FormErrorMessage>
        </FormControl>
    );
};
