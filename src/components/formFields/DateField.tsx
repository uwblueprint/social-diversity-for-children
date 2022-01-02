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
    time?: boolean;
};

export const DateField: React.FC<Props> = ({
    value,
    setValue,
    name,
    required = true,
    edit = true,
    time = false,
}): JSX.Element => {
    if (!Date.parse(value)) {
        setValue(String(moment().toDate()));
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
                        showMonthDropdown
                        showYearDropdown
                        yearDropdownItemNumber={10}
                        scrollableYearDropdown
                        dateFormat={time ? "yyyy-MM-dd h:mm aa" : "yyyy-MM-dd"}
                        selected={Date.parse(value) || moment().toDate()}
                        onChange={(date) => setValue(date)}
                        showTimeSelect={time}
                        timeFormat="HH:mm"
                        dropdownMode="select"
                    />
                </Box>
            )}
        </FormControl>
    );
};
