import { AdminBadge } from "@components/AdminBadge";
import { SDCBadge } from "@components/SDCBadge";
import { User, Volunteer } from "@prisma/client";
import convertToAge from "@utils/convertToAge";
import Link from "next/link";
import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { CellProps } from "react-table";

export type VolunteerDataType = {
    id: number;
    fullName: string;
    email: string;
    cityProvince: string;
    age: number;
    criminalCheckApproved: string;
};

/**
 * use volunteers table data hook to format all the data needed for an admin table
 * @param  volunteers volunteer users
 * @returns header columns, row data, csv data for table
 */
export default function useVolunteersTableData(
    volunteers: (User & {
        volunteer: Volunteer;
    })[],
): {
    volunteerColumns: {
        Header: string;
        accessor: string;
        isNumeric?: boolean;
        Cell?: (props: CellProps<VolunteerDataType>) => JSX.Element;
    }[];
    volunteerData: VolunteerDataType[];
} {
    const volunteerColumns = React.useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Name",
                accessor: "fullName",
                Cell: (props: CellProps<VolunteerDataType>) => {
                    return (
                        <Link
                            href={`/admin/registrant/volunteer/${props.row.original.id}`}
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
                Header: "City",
                accessor: "cityProvince",
            },
            {
                Header: "Age",
                isNumeric: true,
                accessor: "age",
            },
            {
                Header: "Background Check",
                accessor: "criminalCheckApproved",
                Cell: (props: CellProps<VolunteerDataType>) => {
                    return props.row.original.criminalCheckApproved ===
                        "Complete" ? (
                        <SDCBadge>Complete</SDCBadge>
                    ) : (
                        <AdminBadge>Incomplete</AdminBadge>
                    );
                },
            },
        ],
        [],
    );
    const volunteerData = React.useMemo(
        () =>
            volunteers?.map((user) => {
                return {
                    id: user.volunteer.id,
                    fullName: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    cityProvince: `${user.volunteer.cityName}, ${user.volunteer.province}`,
                    age: convertToAge(new Date(user.volunteer.dateOfBirth)),
                    criminalCheckApproved: user.volunteer.criminalCheckApproved
                        ? "Complete"
                        : "Incomplete",
                };
            }),
        [volunteers],
    );
    return { volunteerColumns, volunteerData };
}
