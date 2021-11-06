import { ParentReg, Student } from "@prisma/client";
import parsePhoneNumber from "@utils/parsePhoneNumber";
import Link from "next/link";
import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";

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
        fullName: JSX.Element;
        emergFullName: string;
        emergNumber: string;
        grade: number;
        cityProvince: string;
    }[];
    studentCsvData: {
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
                Header: "Name",
                accessor: "fullName",
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
                    fullName: (
                        <Link href={`/admin/registrant/parent/${reg.parentId}`}>
                            <ChakraLink>
                                {`${reg.student.firstName} ${reg.student.lastName}`}
                            </ChakraLink>
                        </Link>
                    ),
                    emergFullName: `${reg.student.emergFirstName} ${reg.student.emergLastName}`,
                    emergNumber: parsePhoneNumber(reg.student.emergNumber),
                    grade: reg.student.grade,
                    cityProvince: `${reg.student.cityName}, ${reg.student.province}`,
                };
            }),
        [studentRegs],
    );
    const studentCsvData = React.useMemo(
        () =>
            studentRegs?.map((reg) => {
                return {
                    fullName: `${reg.student.firstName} ${reg.student.lastName}`,
                    emergFullName: `${reg.student.emergFirstName} ${reg.student.emergLastName}`,
                    emergNumber: reg.student.emergNumber,
                    grade: reg.student.grade,
                    cityProvince: `${reg.student.cityName}, ${reg.student.province}`,
                };
            }),
        [studentRegs],
    );
    return { studentColumns, studentData, studentCsvData };
}
