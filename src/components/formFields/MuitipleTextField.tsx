import React, { useState } from "react";
import {
    FormLabel,
    FormControl,
    Input,
    FormErrorMessage,
    Textarea,
    FormControlProps,
    Select,
} from "@chakra-ui/react";
import { locale } from "@prisma/client";
import { HStack } from "@chakra-ui/layout";

type Props = FormControlProps & {
    value: string[];
    setValue: (text: string[]) => void;
    name: string;
    placeholder?: string;
    required?: boolean;
    longAnswer?: boolean;
    edit?: boolean;
};

export const MultipleTextField: React.FC<Props> = ({
    value,
    setValue,
    name,
    placeholder,
    required = true,
    longAnswer = false,
    edit = true,
    ...props
}): JSX.Element => {
    const [interactedWith, setInteractedWith] = useState(false);
    const [language, setLanguage] = useState(0); //0 is english
    const formatInput = () => {
        setValue([...value?.map((val) => val.trim())]);
    };

    //Only the english translation is required!
    return (
        <FormControl
            style={longAnswer ? { height: "160px" } : { height: "50px" }}
            isRequired={required && edit}
            isInvalid={value && !value[0] && required && interactedWith && edit}
            {...props}
        >
            <HStack>
                <FormLabel w="100%">{name}</FormLabel>
                <Select
                    style={{ width: 70, float: "right" }}
                    size="xs"
                    onChange={(e) => setLanguage(parseInt(e.target.value))}
                >
                    {Object.keys(locale)
                        .sort()
                        .map((l, index) => (
                            <option key={"Language_Option_" + index} value={index}>
                                {l === "en" ? "en*" : l}
                            </option>
                        ))}
                </Select>
            </HStack>
            {!edit ? (
                <p>{value}</p>
            ) : longAnswer ? (
                <Textarea
                    placeholder={placeholder}
                    size="sm"
                    onChange={(e) => {
                        value.splice(language, 1, e.target.value);
                        setValue([...value]);
                        setInteractedWith(true);
                    }}
                    value={value && value[language]}
                    onBlur={formatInput}
                ></Textarea>
            ) : (
                <Input
                    placeholder={placeholder || name}
                    onChange={(e) => {
                        value.splice(language, 1, e.target.value);
                        setValue([...value]);
                        setInteractedWith(true);
                    }}
                    onBlur={formatInput}
                    value={value && value[language]}
                />
            )}
            <FormErrorMessage>{"English Required"}</FormErrorMessage>
        </FormControl>
    );
};
