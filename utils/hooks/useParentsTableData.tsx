import { Parent, Student, User } from "@prisma/client";
import parsePhoneNumber from "@utils/parsePhoneNumber";
import Link from "next/link";
import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";

/**
 * use parents table data hook to format all the data needed for an admin table
 * @param  parents - parent users
 * @returns header columns, row data, csv data for table
 */
export function useParentsTableData(
    parents: (User & {
        parent: Parent & {
            students: Student[];
        };
    })[],
): {
    parentColumns: {
        Header: string;
        accessor: string;
        isNumeric?: boolean;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell?: (props: any) => JSX.Element;
    }[];
    parentData: {
        fullName: string;
        email: string;
        phone: string;
        numberChildren: number;
    }[];
} {
    const parentColumns = React.useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
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
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Phone",
                accessor: "phone",
            },
            {
                Header: "# Children",
                accessor: "numberChildren",
                isNumeric: true,
            },
        ],
        [],
    );
    const parentData = React.useMemo(
        () =>
            parents?.map((user) => {
                return {
                    id: user.id,
                    fullName: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    phone: parsePhoneNumber(user.parent.phoneNumber),
                    numberChildren: user.parent.students.length,
                };
            }),
        [parents],
    );
    return { parentColumns, parentData };
}
