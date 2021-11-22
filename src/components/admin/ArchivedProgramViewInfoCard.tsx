import { locale } from ".prisma/client";
import {
    AspectRatio,
    Box,
    Flex,
    Grid,
    GridItem,
    Heading,
    IconButton,
    Image,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Spacer,
    Text,
    Tooltip,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { AdminBadge } from "@components/AdminBadge";
import { ProgramCardInfo } from "@models/Program";
import colourTheme from "@styles/colours";
import convertToShortDateRange from "@utils/convertToShortDateRange";
import { deleteProgram } from "@utils/deleteProgram";
import { updateProgramArchive } from "@utils/updateProgramArchive";
import { useRouter } from "next/router";
import React from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { AdminModal } from "./AdminModal";
import { roles } from "@prisma/client";

export type ArchivedProgramViewInfoCard = {
    cardInfo: ProgramCardInfo;
    role: roles;
};

/**
 * Admin archived program view card component used in the admin archived program page
 */
export const ArchivedProgramViewInfoCard: React.FC<ArchivedProgramViewInfoCard> =
    ({ cardInfo, role }) => {
        const router = useRouter();
        const toast = useToast();
        const { start, end } = convertToShortDateRange(
            cardInfo.startDate,
            cardInfo.endDate,
            locale.en,
        );
        const {
            isOpen: isUnarchiveOpen,
            onOpen: onUnarchiveOpen,
            onClose: onUnarchiveClose,
        } = useDisclosure();
        const {
            isOpen: isDeleteOpen,
            onOpen: onDeleteOpen,
            onClose: onDeleteClose,
        } = useDisclosure();

        const onUnarchive = () => {
            updateProgramArchive(cardInfo.id, false);
            toast({
                title: "Program active.",
                description: `${cardInfo.name} and its classes is no longer archived.`,
                status: "info",
                duration: 9000,
                isClosable: true,
                position: "top-right",
                variant: "left-accent",
            });
            router.push("/admin");
        };

        const onDelete = () => {
            deleteProgram(cardInfo.id);
            toast({
                title: "Program deleted.",
                description: `${cardInfo.name} and its classes has been deleted.`,
                status: "info",
                duration: 9000,
                isClosable: true,
                position: "top-right",
                variant: "left-accent",
            });
            router.push("/admin");
        };

        return (
            <>
                <Grid
                    templateColumns="repeat(5, 1fr)"
                    gap={4}
                    minH={165}
                    borderColor={colourTheme.colors.gray}
                    borderWidth={1}
                >
                    <GridItem alignSelf="center" colSpan={2} h="100%">
                        <AspectRatio ratio={2} h="inherit">
                            <Image
                                src={cardInfo.image}
                                fit="cover"
                                alt={cardInfo.name}
                            />
                        </AspectRatio>
                    </GridItem>
                    <GridItem colSpan={3} p={5}>
                        <VStack align="left" justify="center" height="100%">
                            <Flex mr="3" alignItems="baseline">
                                <Heading size="md" fontSize={22}>
                                    {cardInfo.name}
                                </Heading>
                                <Spacer />
                                {role !== roles.PROGRAM_ADMIN ? null : (
                                    <Menu>
                                        <MenuButton
                                            px={4}
                                            py={2}
                                            transition="all 0.2s"
                                            borderRadius="full"
                                            borderWidth="1px"
                                            as={IconButton}
                                            aria-label="Options"
                                            icon={<IoEllipsisVertical />}
                                        />
                                        <MenuList>
                                            <MenuItem
                                                onClick={() =>
                                                    router.push(
                                                        `/admin/edit/program/${cardInfo.id}`,
                                                    )
                                                }
                                            >
                                                Edit
                                            </MenuItem>
                                            <MenuDivider />
                                            <MenuItem onClick={onDeleteOpen}>
                                                Delete
                                            </MenuItem>
                                            <MenuDivider />
                                            <MenuItem onClick={onUnarchiveOpen}>
                                                Unarchive
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                )}
                            </Flex>
                            <Flex>
                                <Box
                                    as="span"
                                    color={colourTheme.colors.Gray}
                                    fontSize="sm"
                                >
                                    {`${start} to ${end}`}
                                </Box>
                            </Flex>
                            <Flex fontSize="sm" pr={20} pb={2}>
                                <Tooltip
                                    label={cardInfo.description}
                                    hasArrow
                                    placement="bottom-end"
                                >
                                    <Text noOfLines={3}>
                                        {cardInfo.description}
                                    </Text>
                                </Tooltip>
                            </Flex>
                            <Flex>
                                <AdminBadge>{cardInfo.tag}</AdminBadge>
                                <AdminBadge ml={2}>
                                    {cardInfo.onlineFormat}
                                </AdminBadge>
                            </Flex>
                        </VStack>
                    </GridItem>
                </Grid>

                <AdminModal
                    isOpen={isUnarchiveOpen}
                    onClose={onUnarchiveClose}
                    onProceed={onUnarchive}
                    header="Are you sure you want to unarchive this program and its classes?"
                    body="You can always archive programs and classes in the Programs page."
                />
                <AdminModal
                    isOpen={isDeleteOpen}
                    onClose={onDeleteClose}
                    onProceed={onDelete}
                    header="Are you sure you want to delete this program and its classes?"
                    body="WARNING: You cannot undo this action."
                />
            </>
        );
    };
