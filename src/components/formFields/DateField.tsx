import React from "react";
import { FormLabel, FormControl, Box } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import moment from "moment";

type Props = {
    value: string;
    setValue: (text: string) => void;
    name: string;
    required?: boolean;
    edit?: boolean;
};

export const DateField: React.FC<Props> = ({
    value,
    setValue,
    name,
    required = true,
    edit = true,
}): JSX.Element => {
    if (!Date.parse(value)) {
        setValue(String(moment().subtract(15, "year").toDate()));
    }
    return (
        <FormControl style={{ height: "50px" }} isRequired={required && edit}>
            {" "}
            <FormLabel>{name}</FormLabel>
            {!edit ? (
                <p>{moment(value).format("yyyy-MM-D")}</p>
            ) : (
                <Box
                    style={{
                        border: "1px #E2E8F0 solid",
                        padding: "10px",
                        borderRadius: 7,
                    }}
                >
                    <DatePicker
                        showYearDropdown
                        yearDropdownItemNumber={10}
                        scrollableYearDropdown
                        dateFormat="yyyy-MM-dd"
                        selected={
                            Date.parse(value) || moment().subtract(15, "year").toDate()
                        }
                        onChange={(date) => setValue(date)}
                    />
                </Box>
            )}
        </FormControl>
    );
};
