import { Button } from "@chakra-ui/react";
import { Teacher, User } from "@prisma/client";
import React, { Dispatch, SetStateAction } from "react";
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
    onOpen: () => void,
    setRevokeName: Dispatch<SetStateAction<string>>,
    setRevokeUserId: Dispatch<SetStateAction<number>>,
    currentUserId: number,
): {
    teacherColumns: {
        Header: string;
        accessor: string;
        isNumeric?: boolean;
        Cell?: (props: CellProps<TeacherDataType>) => JSX.Element;
    }[];
    teacherData: TeacherDataType[];
} {
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
                            isDisabled={currentUserId === props.row.original.id}
                            leftIcon={<MdDelete />}
                            variant="link"
                            color="red.400"
                            onClick={() => {
                                setRevokeName(props.row.original.fullName);
                                setRevokeUserId(props.row.original.id);
                                onOpen();
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
