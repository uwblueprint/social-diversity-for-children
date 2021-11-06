import { AdminBadge } from "@components/AdminBadge";
import { SDCBadge } from "@components/SDCBadge";
import { User, Volunteer, VolunteerReg } from "@prisma/client";
import convertToAge from "@utils/convertToAge";
import Link from "next/link";
import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";

export function useVolunteerTableData(
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
        fullName: JSX.Element;
        email: string;
        cityProvince: string;
        age: number;
        criminalCheckApproved: JSX.Element;
    }[];
    volunteerCsvData: {
        fullName: string;
        email: string;
        cityProvince: string;
        age: number;
        criminalCheckApproved: string;
    }[];
} {
    const volunteerColumns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "fullName",
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
            },
        ],
        [],
    );
    const volunteerData = React.useMemo(
        () =>
            volunteerRegs?.map((reg) => {
                return {
                    fullName: (
                        <Link
                            href={`/admin/registrant/volunteer/${reg.volunteer.id}`}
                        >
                            <ChakraLink>
                                {`${reg.volunteer.user.firstName} ${reg.volunteer.user.lastName}`}
                            </ChakraLink>
                        </Link>
                    ),
                    email: reg.volunteer.user.email,
                    cityProvince: `${reg.volunteer.cityName}, ${reg.volunteer.province}`,
                    age: convertToAge(new Date(reg.volunteer.dateOfBirth)),
                    criminalCheckApproved: reg.volunteer
                        .criminalCheckApproved ? (
                        <SDCBadge>Complete</SDCBadge>
                    ) : (
                        <AdminBadge>Incomplete</AdminBadge>
                    ),
                };
            }),
        [volunteerRegs],
    );
    const volunteerCsvData = React.useMemo(
        () =>
            volunteerRegs?.map((reg) => {
                return {
                    fullName: `${reg.volunteer.user.firstName} ${reg.volunteer.user.lastName}`,
                    email: reg.volunteer.user.email,
                    cityProvince: `${reg.volunteer.cityName}, ${reg.volunteer.province}`,
                    age: convertToAge(new Date(reg.volunteer.dateOfBirth)),
                    criminalCheckApproved: reg.volunteer.criminalCheckApproved
                        ? "true"
                        : "false",
                };
            }),
        [volunteerRegs],
    );
    return { volunteerColumns, volunteerData, volunteerCsvData };
}
