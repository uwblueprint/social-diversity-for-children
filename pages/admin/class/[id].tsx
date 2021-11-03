import { SearchIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    chakra,
    Flex,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Tab,
    Table,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    VStack,
} from "@chakra-ui/react";
import { ClassViewInfoCard } from "@components/admin/ClassViewInfoCard";
import Wrapper from "@components/AdminWrapper";
import { Loading } from "@components/Loading";
import { locale, roles } from "@prisma/client";
import useUpcomingClasses from "@utils/hooks/useUpcomingClasses";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import React from "react";
import { useSortBy, useTable } from "react-table";

type ClassViewProps = {
    session: Record<string, unknown>;
};

/**
 * Admin dasboard page that displays the platform stats, live classes, and upcoming classes
 * @returns Admin dashboard page component
 */
export default function ClassView(props: ClassViewProps): JSX.Element {
    // We want a hook that grabs the current class data
    const { upcomingClasses, isLoading: isUpcomingLoading } =
        useUpcomingClasses(locale.en);
    const classCard = upcomingClasses[0];

    const data = React.useMemo(
        () => [
            {
                fullName: "Joe Black",
                emergFullName: "Rickson Yang",
                emergNumber: "123-456-789",
                grade: 5,
                cityProvince: "Waterloo, ON",
            },
            {
                fullName: "Boe Black",
                emergFullName: "Rickson Yang",
                emergNumber: "123-456-789",
                grade: 7,
                cityProvince: "Waterloo, ON",
            },
            {
                fullName: "Loe Black",
                emergFullName: "Rickson Yang",
                emergNumber: "123-456-789",
                grade: 3,
                cityProvince: "Waterloo, ON",
            },
        ],
        [],
    );
    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "fullName",
            },
            {
                Header: "Emergency Contact",
                accessor: "emergFullName",
            },
            {
                Header: "Phone Number",
                accessor: "emergNumber",
            },
            {
                Header: "Grade",
                accessor: "grade",
                isNumeric: true,
            },
            {
                Header: "City",
                accessor: "cityProvince",
            },
        ],
        [],
    );
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data }, useSortBy);

    if (isUpcomingLoading) {
        return <Loading />;
    }

    return (
        <Wrapper session={props.session}>
            <VStack mx={8} spacing={8} mt={10} alignItems="flex-start">
                <Breadcrumb separator={">"}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/program">
                            Browse Programs
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        {/* TODO: Change ID to program ID */}
                        <BreadcrumbLink href={`/admin/program/${classCard.id}`}>
                            {classCard.programName}
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="#" fontWeight="bold">
                            {classCard.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <ClassViewInfoCard cardInfo={classCard} />
                <Tabs w="100%">
                    <TabList>
                        <Tab>
                            {classCard.spaceTaken} Student
                            {classCard.spaceTaken != 1 ? "s" : ""}
                        </Tab>
                        <Tab>
                            {classCard.volunteerSpaceTaken} Volunteer
                            {classCard.volunteerSpaceTaken != 1 ? "s" : ""}
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Flex>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={
                                            <Icon
                                                as={SearchIcon}
                                                color="gray.300"
                                            />
                                        }
                                    />
                                    <Input
                                        type="programs"
                                        placeholder="Search SDC Programs"
                                    />
                                </InputGroup>
                                <Button>Export Classlist</Button>
                            </Flex>
                            <Table {...getTableProps()}>
                                <Thead>
                                    {headerGroups.map((headerGroup) => (
                                        <Tr
                                            {...headerGroup.getHeaderGroupProps()}
                                        >
                                            {headerGroup.headers.map(
                                                (column) => (
                                                    <Th
                                                        {...column.getHeaderProps(
                                                            column.getSortByToggleProps(),
                                                        )}
                                                        isNumeric={
                                                            column.isNumeric
                                                        }
                                                    >
                                                        {column.render(
                                                            "Header",
                                                        )}
                                                        <chakra.span pl="4">
                                                            {column.isSorted ? (
                                                                column.isSortedDesc ? (
                                                                    <TriangleDownIcon aria-label="sorted descending" />
                                                                ) : (
                                                                    <TriangleUpIcon aria-label="sorted ascending" />
                                                                )
                                                            ) : null}
                                                        </chakra.span>
                                                    </Th>
                                                ),
                                            )}
                                        </Tr>
                                    ))}
                                </Thead>
                                <Tbody {...getTableBodyProps()}>
                                    {rows.map((row) => {
                                        prepareRow(row);
                                        return (
                                            <Tr {...row.getRowProps()}>
                                                {row.cells.map((cell) => (
                                                    <Td
                                                        {...cell.getCellProps()}
                                                        isNumeric={
                                                            cell.column
                                                                .isNumeric
                                                        }
                                                    >
                                                        {cell.render("Cell")}
                                                    </Td>
                                                ))}
                                            </Tr>
                                        );
                                    })}
                                </Tbody>
                            </Table>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </VStack>
        </Wrapper>
    );
}

/**
 * getServerSideProps gets the session before this page is rendered
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    // obtain the next auth session
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    } else if (
        ![roles.PROGRAM_ADMIN, roles.TEACHER].includes((session as any).role)
    ) {
        return {
            redirect: {
                destination: "/no-access",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
