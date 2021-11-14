import { Button } from "@chakra-ui/button";
import { ProgramAdmin, User } from "@prisma/client";
import React from "react";
import { MdDelete } from "react-icons/md";

/**
 * use admins table data hook to format all the data needed for an admin table
 * @param  admins - admin users
 * @returns header columns, row data, csv data for table
 */
export function useAdminsTableData(
    admins: (User & {
        programAdmins: ProgramAdmin;
    })[],
): {
    adminColumns: {
        Header: string;
        accessor: string;
        isNumeric?: boolean;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell?: (props: any) => JSX.Element;
    }[];
    adminData: {
        fullName: string;
        email: string;
    }[];
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
                Cell: (props) => {
                    return (
                        <Button leftIcon={<MdDelete />} bgColor="transparent">
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
