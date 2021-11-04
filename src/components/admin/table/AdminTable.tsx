import {
    TriangleDownIcon,
    TriangleUpIcon,
    SearchIcon,
    ArrowDownIcon,
} from "@chakra-ui/icons";
import {
    Button,
    chakra,
    Flex,
    FlexProps,
    Icon,
    InputGroup,
    InputLeftElement,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { Loading } from "@components/Loading";
import colourTheme from "@styles/colours";
import React from "react";
import { useSortBy, useGlobalFilter, useTable } from "react-table";
import { CSVLink } from "react-csv";
import { GlobalTableFilter } from "./GlobalTableFilter";

export type AdminTableProps = {
    dataColumns: any;
    tableData: any;
    className: string;
    isRegistrantLoading: boolean;
};

// Define a default UI for filtering
export const AdminTable: React.FC<AdminTableProps> = ({
    dataColumns,
    tableData,
    className,
    isRegistrantLoading,
}): JSX.Element => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable(
        { columns: dataColumns, data: tableData || [] },
        useGlobalFilter,
        useSortBy,
    );

    return (
        <>
            <AdminTableInput
                state={state}
                setGlobalFilter={setGlobalFilter}
                tableData={tableData}
                className={className}
                mb={4}
            />
            {isRegistrantLoading ? (
                <Loading />
            ) : (
                <Table {...getTableProps()}>
                    <Thead>
                        {headerGroups.map((headerGroup) => (
                            <Tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <Th
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps(),
                                        )}
                                        isNumeric={column.isNumeric}
                                    >
                                        {column.render("Header")}
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
                                ))}
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
                                            isNumeric={cell.column.isNumeric}
                                        >
                                            {cell.render("Cell")}
                                        </Td>
                                    ))}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            )}
        </>
    );
};

export type AdminTableInputProps = FlexProps & {
    state: any;
    setGlobalFilter: any;
    tableData: any[];
    className: string;
};

export const AdminTableInput: React.FC<AdminTableInputProps> = ({
    state,
    setGlobalFilter,
    tableData,
    className,
    ...props
}): JSX.Element => {
    return (
        <Flex {...props}>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={SearchIcon} color="gray.300" />}
                />
                <GlobalTableFilter
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            </InputGroup>
            <Button
                border="1px"
                borderColor={colourTheme.colors.Sliver}
                px={9}
                ml={5}
                backgroundColor="white"
                _active={{}}
                _focus={{}}
                borderRadius={"6px"}
                fontWeight="normal"
            >
                <ArrowDownIcon mr={2} />
                <CSVLink data={tableData} filename={`${className}.csv`}>
                    Export Classlist
                </CSVLink>
            </Button>
        </Flex>
    );
};
