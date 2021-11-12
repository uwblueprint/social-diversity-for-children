import { Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

export type GlobalTableFilterProps = {
    globalFilter: any;
    setGlobalFilter: (filterValue: any) => void;
    placeholder?: string;
};

/**
 * Generic global filtering input component for react-tables
 * @returns A input component with global filtering capability
 */
export const GlobalTableFilter: React.FC<GlobalTableFilterProps> = ({
    globalFilter,
    setGlobalFilter,
    placeholder,
}): JSX.Element => {
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <Input
            pl={8}
            value={value || ""}
            onChange={(e) => {
                setValue(e.target.value);
                onChange(e.target.value);
            }}
            placeholder={placeholder}
        />
    );
};
