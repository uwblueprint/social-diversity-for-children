import { Parent, Student, User } from "@prisma/client";
import parsePhoneNumber from "@utils/parsePhoneNumber";
import Link from "next/link";
import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { CellProps } from "react-table";

export type ParentDataType = {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    numberChildren: number;
};

/**
 * use parents table data hook to format all the data needed for an admin table
 * @param  parents - parent users
 * @returns header columns, row data, csv data for table
 */
export default function useParentsTableData(
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
        Cell?: (props: CellProps<ParentDataType>) => JSX.Element;
    }[];
    parentData: ParentDataType[];
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
                Cell: (props: CellProps<ParentDataType>) => {
                    return (
                        <Link href={`/admin/registrant/user/${props.row.original.id}`}>
                            <ChakraLink>{props.row.original.fullName}</ChakraLink>
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
