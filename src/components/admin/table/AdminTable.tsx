import {
    TriangleDownIcon,
    TriangleUpIcon,
    SearchIcon,
    ArrowDownIcon,
    ArrowForwardIcon,
    ArrowBackIcon,
    ChevronDownIcon,
} from "@chakra-ui/icons";
import {
    Button,
    chakra,
    Flex,
    FlexProps,
    Icon,
    InputGroup,
    InputLeftElement,
    Select,
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
import {
    useSortBy,
    useGlobalFilter,
    useTable,
    usePagination,
} from "react-table";
import { CSVLink } from "react-csv";
import { GlobalTableFilter } from "./GlobalTableFilter";

export type AdminTableProps = {
    dataColumns: any;
    tableData: any;
    csvData?: any;
    exportName: string;
    isLoading?: boolean;
    filterPlaceholder?: string;
};

// Define a default UI for filtering
export const AdminTable: React.FC<AdminTableProps> = ({
    dataColumns,
    tableData,
    csvData,
    exportName,
    isLoading,
    filterPlaceholder,
}): JSX.Element => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        state: { pageIndex, globalFilter },
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setGlobalFilter,
    } = useTable(
        {
            columns: dataColumns || [],
            data: tableData || [],
            initialState: { pageSize: 20 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
    );

    return (
        <>
            <AdminTableInput
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                csvData={csvData || tableData}
                exportName={exportName}
                placeholder={filterPlaceholder}
                mb={4}
            />
            {isLoading ? (
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
                        {page.map((row) => {
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
            <Flex justifyContent="flex-end" alignItems="baseline" mt={4}>
                <Select
                    size="sm"
                    icon={<ChevronDownIcon />}
                    color={colourTheme.colors.Blue}
                    borderColor={colourTheme.colors.Blue}
                    borderWidth={2}
                    borderRadius={6}
                    maxWidth={16}
                    value={pageIndex + 1}
                    onChange={(event) =>
                        gotoPage(parseInt(event.target.value, 10) - 1)
                    }
                    mr={3}
                >
                    {pageOptions.map((option, i) => {
                        return (
                            <option key={i} value={i + 1}>
                                {i + 1}
                            </option>
                        );
                    })}
                </Select>
                of {pageCount} pages
                <Button
                    ml={8}
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    variant="ghost"
                >
                    <ArrowBackIcon />
                </Button>
                <Button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    variant="ghost"
                >
                    <ArrowForwardIcon />
                </Button>
            </Flex>
        </>
    );
};

export type AdminTableInputProps = FlexProps & {
    globalFilter: any;
    setGlobalFilter: any;
    csvData: any[];
    exportName: string;
    placeholder?: string;
};

export const AdminTableInput: React.FC<AdminTableInputProps> = ({
    globalFilter,
    setGlobalFilter,
    csvData,
    exportName,
    placeholder,
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
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                    placeholder={placeholder}
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
                <CSVLink data={csvData || []} filename={`${exportName}.csv`}>
                    Export Classlist
                </CSVLink>
            </Button>
        </Flex>
    );
};
