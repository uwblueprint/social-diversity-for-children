import { AdminBadge } from "@components/AdminBadge";
import { SDCBadge } from "@components/SDCBadge";
import { User, Volunteer, VolunteerReg } from "@prisma/client";
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
 * use volunteer table data hook to format all the data needed for an admin table
 * @param  volunteerRegs volunteer registrations
 * @returns header columns, row data, csv data for table
 */
export default function useVolunteerRegTableData(
    volunteerRegs: (VolunteerReg & {
        volunteer: Volunteer & {
            user: User;
        };
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
                        <Link href={`/admin/registrant/volunteer/${props.row.original.id}`}>
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
                    const status = props.row.original.criminalCheckApproved;
                    return status === "Complete" ? (
                        <SDCBadge>{status}</SDCBadge>
                    ) : (
                        <AdminBadge>{status}</AdminBadge>
                    );
                },
            },
        ],
        [],
    );
    const volunteerData = React.useMemo(
        () =>
            volunteerRegs?.map((reg) => {
                return {
                    id: reg.volunteerId,
                    fullName: `${reg.volunteer.user.firstName} ${reg.volunteer.user.lastName}`,
                    email: reg.volunteer.user.email,
                    cityProvince:
                        reg.volunteer.cityName && reg.volunteer.province
                            ? `${reg.volunteer.cityName}, ${reg.volunteer.province}`
                            : reg.volunteer.cityName
                            ? reg.volunteer.cityName
                            : "N/A",
                    age: convertToAge(new Date(reg.volunteer.dateOfBirth)),
                    criminalCheckApproved: reg.volunteer.criminalCheckApproved
                        ? "Complete"
                        : reg.volunteer.criminalRecordCheckLink
                        ? "Pending"
                        : "Incomplete",
                };
            }),
        [volunteerRegs],
    );
    return { volunteerColumns, volunteerData };
}
