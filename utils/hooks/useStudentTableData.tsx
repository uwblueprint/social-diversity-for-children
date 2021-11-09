import { ParentReg, Student } from "@prisma/client";
import parsePhoneNumber from "@utils/parsePhoneNumber";
import Link from "next/link";
import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";

/**
 * use student table data hook to format all the data needed for an admin table
 * @param  studentRegs student registrations - from parent regs
 * @returns header columns, row data, csv data for table
 */
export function useStudentTableData(
    studentRegs: (ParentReg & {
        student: Student;
    })[],
): {
    studentColumns: {
        Header: string;
        accessor: string;
        isNumeric?: boolean;
    }[];
    studentData: {
        fullName: string;
        emergFullName: string;
        emergNumber: string;
        grade: number;
        cityProvince: string;
    }[];
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
                Cell: (props) => {
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
                    // This should be a link
                    parentId: reg.student.parentId,
                    fullName: `${reg.student.firstName} ${reg.student.lastName}`,
                    emergFullName: `${reg.student.emergFirstName} ${reg.student.emergLastName}`,
                    emergNumber: parsePhoneNumber(reg.student.emergNumber),
                    grade: reg.student.grade,
                    cityProvince: `${reg.student.cityName}, ${reg.student.province}`,
                };
            }),
        [studentRegs],
    );
    return { studentColumns, studentData };
}
