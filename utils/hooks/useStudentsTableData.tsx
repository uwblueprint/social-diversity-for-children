import { Student } from "@prisma/client";
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
 * use students table data hook to format all the data needed for an admin table
 * @param  students students - from parent users
 * @returns header columns, row data, csv data for table
 */
export default function useStudentsTableData(students: Student[]): {
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
                        <Link href={`/admin/registrant/user/${props.row.original.parentId}`}>
                            <ChakraLink>{props.row.original.fullName}</ChakraLink>
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
            students?.map((student) => {
                return {
                    parentId: student.parentId,
                    fullName: `${student.firstName} ${student.lastName}`,
                    emergFullName: `${student.emergFirstName} ${student.emergLastName}`,
                    emergNumber: parsePhoneNumber(student.emergNumber),
                    grade: student.grade ? student.grade.toString() : "-",
                    cityProvince:
                        student.cityName && student.province
                            ? `${student.cityName}, ${student.province}`
                            : student.cityName
                            ? student.cityName
                            : "N/A",
                };
            }),
        [students],
    );
    return { studentColumns, studentData };
}
