import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import { Teacher, User } from "@prisma/client";
import { deleteUser } from "@utils/deleteUser";
import React from "react";
import { MdDelete } from "react-icons/md";
import { CellProps } from "react-table";

export type TeacherDataType = {
    id: number;
    fullName: string;
    email: string;
    numberClasses: number;
};

/**
 * use teacher table data hook to format all the data needed for an admin table
 * @param  teachers - teacher users
 * @returns header columns, row data, csv data for table
 */
export default function useTeachersTableData(
    teachers: (User & {
        teacher: Teacher & {
            _count: {
                teacherRegs: number;
            };
        };
    })[],
): {
    teacherColumns: {
        Header: string;
        accessor: string;
        isNumeric?: boolean;
        Cell?: (props: CellProps<TeacherDataType>) => JSX.Element;
    }[];
    teacherData: TeacherDataType[];
} {
    const toast = useToast();

    const teacherColumns = React.useMemo(
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
                Header: "# Classes",
                accessor: "numberClasses",
            },
            {
                Header: "",
                accessor: "options",
                Cell: (props: CellProps<TeacherDataType>) => {
                    return (
                        <Button
                            leftIcon={<MdDelete />}
                            variant="link"
                            onClick={async () => {
                                const userId = props.row.original.id;
                                const res = await deleteUser(userId);
                                if (res.ok) {
                                    toast({
                                        title: "Teacher has been revoked.",
                                        description: `User with id: ${userId} has been deleted.`,
                                        status: "info",
                                        duration: 9000,
                                        isClosable: true,
                                        position: "top-right",
                                        variant: "left-accent",
                                    });
                                } else {
                                    toast({
                                        title: "Teacher cannot be revoked.",
                                        description: `User with id: ${userId} is currently in use.`,
                                        status: "error",
                                        duration: 9000,
                                        isClosable: true,
                                        position: "top-right",
                                        variant: "left-accent",
                                    });
                                }
                            }}
                        >
                            Revoke
                        </Button>
                    );
                },
            },
        ],
        [],
    );
    const teacherData = React.useMemo(
        () =>
            teachers?.map((user) => {
                return {
                    id: user.id,
                    fullName: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    numberClasses: user.teacher._count.teacherRegs,
                };
            }),
        [teachers],
    );
    return { teacherColumns, teacherData };
}
