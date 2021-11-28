import {
    Box,
    HStack,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Spacer,
    Tooltip,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { AdminBadge } from "@components/AdminBadge";
import { locale, roles } from "@prisma/client";
import colourTheme from "@styles/colours";
import convertToShortDateRange from "@utils/convertToShortDateRange";
import { deleteProgram } from "@utils/deleteProgram";
import { infoToastOptions } from "@utils/toast/options";
import { updateProgramArchive } from "@utils/updateProgramArchive";
import type { ProgramCardInfo } from "models/Program";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { IoEllipsisVertical } from "react-icons/io5";
import { AdminModal } from "./AdminModal";

type BrowseProgramCardProps = {
    styleProps?: Record<string, unknown>;
    cardInfo: ProgramCardInfo;
    role?: roles;
};

export const BrowseProgramCard: React.FC<BrowseProgramCardProps> = ({
    cardInfo,
    role,
}): JSX.Element => {
    const { t } = useTranslation("common");
    const router = useRouter();
    const toast = useToast();

    const {
        isOpen: isArchiveOpen,
        onOpen: onArchiveOpen,
        onClose: onArchiveClose,
    } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

    const onArchive = async () => {
        await updateProgramArchive(cardInfo.id, true);
        toast(infoToastOptions("Program archived.", `${cardInfo.name} has been archived.`));
    };
    const onDelete = async () => {
        await deleteProgram(cardInfo.id);
        toast(infoToastOptions("Program deleted.", `${cardInfo.name} has been deleted.`));
    };

    return (
        <>
            <Box
                borderWidth="1px"
                width="100%"
                _hover={{
                    borderColor: colourTheme.colors.Blue,
                    borderWidth: 1,
                }}
            >
                <Box p="25px">
                    <HStack>
                        <Link
                            params={{ cardInfo: cardInfo }}
                            href={`/admin/program/${cardInfo.id}`}
                        >
                            <Box mt="1" fontWeight="600" fontSize="18px">
                                {cardInfo.name}
                            </Box>
                        </Link>
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
                                            router.push(`/admin/edit/program/${cardInfo.id}`)
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
                    </HStack>
                    <Box as="span" color="gray.600" fontSize="sm">
                        {t("time.range", {
                            ...convertToShortDateRange(
                                cardInfo.startDate,
                                cardInfo.endDate,
                                router.locale as locale,
                            ),
                        })}
                    </Box>
                    <Tooltip label={cardInfo.description} hasArrow>
                        <Box
                            whiteSpace="pre-wrap"
                            noOfLines={2}
                            overflow="hidden"
                            height={9}
                            mt="2"
                            fontSize="12px"
                        >
                            {cardInfo.description}
                        </Box>
                    </Tooltip>
                    <Box mt={6}>
                        <AdminBadge>{cardInfo.tag}</AdminBadge>
                        <AdminBadge ml={2}>{cardInfo.onlineFormat}</AdminBadge>
                    </Box>
                </Box>
            </Box>
            <AdminModal
                isOpen={isArchiveOpen}
                onClose={onArchiveClose}
                onProceed={onArchive}
                header={`Are you sure you want to archive ${cardInfo.name} and its classes?`}
                body="You can always view the archived programs in the Archive page."
            />
            <AdminModal
                isOpen={isDeleteOpen}
                onClose={onDeleteClose}
                onProceed={onDelete}
                header={`Are you sure you want to delete ${cardInfo.name} and its classes?`}
                body="WARNING: You cannot undo this action."
            />
        </>
    );
};
