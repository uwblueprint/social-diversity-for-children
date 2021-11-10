import React from "react";
import { FormLabel, FormControl, Select } from "@chakra-ui/react";
import { province } from "@models/User";

type Props = {
    value: string;
    setValue: (text: string) => void;
    name: string;
    required?: boolean;
    edit?: boolean;
};

export const ProvinceField: React.FC<Props> = ({
    value,
    setValue,
    name,
    required = true,
    edit = true,
}): JSX.Element => {
    return (
        <FormControl isRequired={required && edit} style={{ height: "50px" }}>
            <FormLabel>{name}</FormLabel>
            {!edit ? (
                <p>{value}</p>
            ) : (
                <Select
                    placeholder={"Select an option"}
                    onChange={(e) => setValue(province[e.target.value])}
                    value={value}
                >
                    <option value="NL">NL</option>
                    <option value="PE">PE</option>
                    <option value="NS">NS</option>
                    <option value="NB">NB</option>
                    <option value="QC">QC</option>
                    <option value="ON">ON</option>
                    <option value="MB">MB</option>
                    <option value="SK">SK</option>
                    <option value="AB">AB</option>
                    <option value="BC">BC</option>
                    <option value="YT">YT</option>
                    <option value="NT">NT</option>
                    <option value="NU">NU</option>
                </Select>
            )}
        </FormControl>
    );
};
