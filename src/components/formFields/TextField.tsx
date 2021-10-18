import React, { useState } from "react";
import {
    FormLabel,
    FormControl,
    Input,
    FormErrorMessage,
    Textarea,
} from "@chakra-ui/react";

type Props = {
    value: string;
    setValue: (text: string) => void;
    name: string;
    placeholder?: string;
    required?: boolean;
    longAnswer?: boolean;
};

export const TextField: React.FC<Props> = ({
    value,
    setValue,
    name,
    placeholder,
    required = true,
    longAnswer = false,
}): JSX.Element => {
    const [interactedWith, setInteractedWith] = useState(false);
    return (
        <FormControl
            style={longAnswer ? { height: "160px" } : { height: "50px" }}
            isRequired={required}
            isInvalid={!value && required && interactedWith}
        >
            <FormLabel>{name}</FormLabel>
            {longAnswer ? (
                <Textarea
                    placeholder={placeholder}
                    size="sm"
                    onChange={(e) => {
                        setValue(e.target.value);
                        setInteractedWith(true);
                    }}
                    value={value}
                ></Textarea>
            ) : (
                <Input
                    placeholder={placeholder || name}
                    onChange={(e) => {
                        setValue(e.target.value);
                        setInteractedWith(true);
                    }}
                    value={value}
                />
            )}
            <FormErrorMessage>{"Required"}</FormErrorMessage>
        </FormControl>
    );
};
