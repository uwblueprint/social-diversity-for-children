import { AdminBadge } from "@components/AdminBadge";
import { SDCBadge } from "@components/SDCBadge";
import { User, Volunteer, VolunteerReg } from "@prisma/client";
import convertToAge from "@utils/convertToAge";
import Link from "next/link";
import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";

/**
 * use volunteer table data hook to format all the data needed for an admin table
 * @param  volunteerRegs volunteer registrations
 * @returns header columns, row data, csv data for table
 */
export function useVolunteerRegTableData(
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
    }[];
    volunteerData: {
        fullName: string;
        email: string;
        cityProvince: string;
        age: number;
        criminalCheckApproved: boolean;
    }[];
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
                Cell: (props) => {
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
                Cell: (props) => {
                    return props.row.original.criminalCheckApproved ? (
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
            volunteerRegs?.map((reg) => {
                return {
                    id: reg.volunteerId,
                    fullName: `${reg.volunteer.user.firstName} ${reg.volunteer.user.lastName}`,
                    email: reg.volunteer.user.email,
                    cityProvince: `${reg.volunteer.cityName}, ${reg.volunteer.province}`,
                    age: convertToAge(new Date(reg.volunteer.dateOfBirth)),
                    criminalCheckApproved: reg.volunteer.criminalCheckApproved,
                };
            }),
        [volunteerRegs],
    );
    return { volunteerColumns, volunteerData };
}
