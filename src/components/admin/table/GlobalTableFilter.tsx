import { Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

export type GlobalTableFilterProps = {
    globalFilter: any;
    setGlobalFilter: any;
};

// Define a default UI for filtering
export const GlobalTableFilter: React.FC<GlobalTableFilterProps> = ({
    globalFilter,
    setGlobalFilter,
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
            placeholder={"Search students"}
        />
    );
};
