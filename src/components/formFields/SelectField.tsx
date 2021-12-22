import React from "react";
import { FormLabel, FormControl, Select } from "@chakra-ui/react";

type Props = {
    value: string;
    setValue: (text: string) => void;
    name: string;
    required?: boolean;
    edit?: boolean;
    options: string[];
};

export const SelectField: React.FC<Props> = ({
    value,
    setValue,
    name,
    required = true,
    edit = true,
    options = [],
}): JSX.Element => {
    return (
        <FormControl isRequired={required && edit} style={{ height: "50px" }}>
            <FormLabel>{name}</FormLabel>
            {!edit ? (
                <p>{value}</p>
            ) : (
                <Select
                    placeholder={"Select an option"}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                >
                    {options.map((tag, index) => {
                        return (
                            <option key={index} value={tag}>
                                {tag}
                            </option>
                        );
                    })}
                </Select>
            )}
        </FormControl>
    );
};
