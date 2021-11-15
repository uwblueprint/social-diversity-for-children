import { ParentReg, Student } from "@prisma/client";
import parsePhoneNumber from "@utils/parsePhoneNumber";
import Link from "next/link";
import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { CellProps } from "react-table";

export type StudentDataType = {
    parentId: number;
    fullName: string;
    emergFullName: string;
    emergNumber: string;
    grade: string;
    cityProvince: string;
};

/**
 * use student table data hook to format all the data needed for an admin table
 * @param  studentRegs student registrations - from parent regs
 * @returns header columns, row data, csv data for table
 */
export default function useStudentRegTableData(
    studentRegs: (ParentReg & {
        student: Student;
    })[],
): {
    studentColumns: {
        Header: string;
        accessor: string;
        isNumeric?: boolean;
        Cell?: (props: CellProps<StudentDataType>) => JSX.Element;
    }[];
    studentData: StudentDataType[];
} {
    const studentColumns = React.useMemo(
        () => [
            {
                Header: "Parent ID",
                accessor: "parentId",
            },
            {
                Header: "Name",
                accessor: "fullName",
                Cell: (props: CellProps<StudentDataType>) => {
                    return (
                        <Link
                            href={`/admin/registrant/parent/${props.row.original.parentId}`}
                        >
                            <ChakraLink>
                                {props.row.original.fullName}
                            </ChakraLink>
                        </Link>
                    );
                },
            },
            {
                Header: "Emergency Contact",
                accessor: "emergFullName",
            },
            {
                Header: "Phone Number",
                accessor: "emergNumber",
            },
            {
                Header: "Grade",
                accessor: "grade",
                isNumeric: true,
            },
            {
                Header: "City",
                accessor: "cityProvince",
            },
        ],
        [],
    );
    const studentData = React.useMemo(
        () =>
            studentRegs?.map((reg) => {
                return {
                    parentId: reg.student.parentId,
                    fullName: `${reg.student.firstName} ${reg.student.lastName}`,
                    emergFullName: `${reg.student.emergFirstName} ${reg.student.emergLastName}`,
                    emergNumber: parsePhoneNumber(reg.student.emergNumber),
                    grade: reg.student.grade
                        ? reg.student.grade.toString()
                        : "-",
                    cityProvince:
                        reg.student.cityName && reg.student.province
                            ? `${reg.student.cityName}, ${reg.student.province}`
                            : reg.student.cityName
                            ? reg.student.cityName
                            : "N/A",
                };
            }),
        [studentRegs],
    );
    return { studentColumns, studentData };
}
