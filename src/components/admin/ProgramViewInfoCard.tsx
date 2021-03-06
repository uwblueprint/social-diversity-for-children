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
import { infoToastOptions } from "@utils/toast/options";
import convertCamelToText from "@utils/convertCamelToText";

export type ProgramViewInfoCard = {
    cardInfo: ProgramCardInfo;
    // Role of user, determines whether to show admin options
    role: roles;
};

/**
 * Admin program view card component used in the admin program page
 */
export const ProgramViewInfoCard: React.FC<ProgramViewInfoCard> = ({ cardInfo, role }) => {
    const router = useRouter();
    const toast = useToast();
    const { start, end } = convertToShortDateRange(cardInfo.startDate, cardInfo.endDate, locale.en);
    const {
        isOpen: isArchiveOpen,
        onOpen: onArchiveOpen,
        onClose: onArchiveClose,
    } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

    const onArchive = () => {
        updateProgramArchive(cardInfo.id, true);
        toast(
            infoToastOptions(
                "Program archived.",
                `${cardInfo.name} and its classes has been archived.`,
            ),
        );
        router.push("/admin/program");
    };

    const onDelete = () => {
        deleteProgram(cardInfo.id);
        toast(infoToastOptions("Program deleted.", `${cardInfo.name} has been deleted.`));
        router.push("/admin/program");
    };

    return (
        <>
            <Grid
                templateColumns="repeat(5, 1fr)"
                gap={4}
                minH={165}
                borderColor={colourTheme.colors.gray}
                borderWidth={1}
                w="100%"
            >
                <GridItem alignSelf="center" colSpan={2} h="100%">
                    <AspectRatio ratio={2} h="inherit">
                        <Image src={cardInfo.image} fit="cover" alt={cardInfo.name} />
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
                                                router.push(`/admin/program/edit/${cardInfo.id}`)
                                            }
                                        >
                                            Edit
                                        </MenuItem>
                                        <MenuDivider />
                                        <MenuItem onClick={onDeleteOpen}>Delete</MenuItem>
                                        <MenuDivider />
                                        <MenuItem onClick={onArchiveOpen}>Archive</MenuItem>
                                    </MenuList>
                                </Menu>
                            )}
                        </Flex>
                        <Flex>
                            <Box as="span" color={colourTheme.colors.Gray} fontSize="sm">
                                {`${start} to ${end}`}
                            </Box>
                        </Flex>
                        <Flex fontSize="sm" pr={20} pb={2}>
                            <Tooltip label={cardInfo.description} hasArrow placement="bottom-end">
                                <Text noOfLines={3}>{cardInfo.description}</Text>
                            </Tooltip>
                        </Flex>
                        <Flex>
                            <AdminBadge>{cardInfo.tag}</AdminBadge>
                            <AdminBadge ml={2}>
                                {convertCamelToText(cardInfo.onlineFormat)}
                            </AdminBadge>
                        </Flex>
                    </VStack>
                </GridItem>
            </Grid>

            <AdminModal
                isOpen={isArchiveOpen}
                onClose={onArchiveClose}
                onProceed={onArchive}
                header="Are you sure you want to archive this program and its classes?"
                body="You can always view the archived programs and classes in the Archive page."
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
