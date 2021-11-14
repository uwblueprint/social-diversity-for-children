import { Button } from "@chakra-ui/button";
import { ProgramAdmin, User } from "@prisma/client";
import React from "react";
import { MdDelete } from "react-icons/md";
import { CellProps } from "react-table";

export type AdminDataType = {
    id: number;
    fullName: string;
    email: string;
};

/**
 * use admins table data hook to format all the data needed for an admin table
 * @param  admins - admin users
 * @returns header columns, row data, csv data for table
 */
export default function useAdminsTableData(
    admins: (User & {
        programAdmins: ProgramAdmin;
    })[],
): {
    adminColumns: {
        Header: string;
        accessor: string;
        isNumeric?: boolean;
        Cell?: (props: CellProps<AdminDataType>) => JSX.Element;
    }[];
    adminData: AdminDataType[];
} {
    const adminColumns = React.useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Name",
                accessor: "fullName",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "",
                accessor: "options",
                Cell: (props: CellProps<AdminDataType>) => {
                    return (
                        <Button
                            leftIcon={<MdDelete />}
                            variant="link"
                            onClick={() => alert(props.row.original.id)}
                        >
                            Revoke
                        </Button>
                    );
                },
            },
        ],
        [],
    );
    const adminData = React.useMemo(
        () =>
            admins?.map((user) => {
                return {
                    id: user.id,
                    fullName: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                };
            }),
        [admins],
    );
    return { adminColumns, adminData };
}
