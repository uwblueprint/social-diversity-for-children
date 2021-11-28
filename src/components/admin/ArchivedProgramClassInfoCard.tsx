import { locale } from ".prisma/client";
import {
    Grid,
    GridItem,
    AspectRatio,
    VStack,
    Flex,
    Heading,
    Spacer,
    Box,
    Image,
    Text,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    IconButton,
    useToast,
    Tooltip,
    useDisclosure,
    Link as ChakraLink,
} from "@chakra-ui/react";
import { AgeBadge } from "@components/AgeBadge";
import { ClassCardInfo } from "@models/Class";
import { roles } from "@prisma/client";
import colourTheme from "@styles/colours";
import convertToShortTimeRange from "@utils/convertToShortTimeRange";
import { deleteClass } from "@utils/deleteClass";
import { weekdayToString } from "@utils/enum/weekday";
import { errorToastOptions, infoToastOptions } from "@utils/toast/options";
import { updateClassArchive } from "@utils/updateClassArchive";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { AdminModal } from "./AdminModal";

export type ArchivedProgramClassInfoCard = {
    cardInfo: ClassCardInfo;
    role: roles;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutateClasses: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
};

/**
 * Admin view archived program class card component used in the admin archived program details page
 */
export const ArchivedProgramClassInfoCard: React.FC<ArchivedProgramClassInfoCard> =
    ({ cardInfo, role, mutateClasses }) => {
        const router = useRouter();
        const toast = useToast();
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

        const onUnarchive = async () => {
            await updateClassArchive(cardInfo.id, false);
            toast(
                infoToastOptions(
                    "Class is active.",
                    `${cardInfo.name} is no longer archived.`,
                ),
            );
            router.push(`/admin/program/${cardInfo.programId}`);
        };
        const onDelete = async () => {
            await deleteClass(cardInfo.id);
            toast(
                errorToastOptions(
                    "Class deleted.",
                    `${cardInfo.name} has been deleted.`,
                ),
            );
            mutateClasses();
        };

        return (
            <>
                <Grid
                    templateColumns="repeat(5, 1fr)"
                    minH={165}
                    borderColor={colourTheme.colors.gray}
                    borderWidth={1}
                >
                    <GridItem alignSelf="center" maxW={200}>
                        <AspectRatio width="100%" ratio={1}>
                            <Image
                                src={cardInfo.image}
                                fit="cover"
                                alt={cardInfo.name}
                            />
                        </AspectRatio>
                    </GridItem>
                    <GridItem colSpan={4} p={1}>
                        <VStack align="left" justify="center" height="100%">
                            <Flex mr="3" alignItems="baseline">
                                <Link href={`/admin/class/${cardInfo.id}`}>
                                    <ChakraLink>
                                        <Heading size="md">
                                            {cardInfo.name}
                                        </Heading>
                                    </ChakraLink>
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
                                                    router.push(
                                                        `/admin/edit/class/${cardInfo.id}`,
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
                            <Tooltip
                                label={cardInfo.teacherName}
                                hasArrow
                                placement="bottom-end"
                            >
                                <Box
                                    as="span"
                                    color={colourTheme.colors.Gray}
                                    fontSize="sm"
                                    noOfLines={1}
                                >
                                    {weekdayToString(
                                        cardInfo.weekday,
                                        locale.en,
                                    )}{" "}
                                    {convertToShortTimeRange(
                                        cardInfo.startTimeMinutes,
                                        cardInfo.durationMinutes,
                                    )}
                                    {" with Teacher " + cardInfo.teacherName}
                                </Box>
                            </Tooltip>
                            <Flex color={colourTheme.colors.Gray} fontSize="sm">
                                <Text>
                                    {cardInfo.spaceTaken} participant
                                    {cardInfo.spaceTaken > 1 ? "s" : ""}{" "}
                                    registered
                                </Text>
                                <Text ml={5}>
                                    {cardInfo.volunteerSpaceTaken} volunteer
                                    {cardInfo.volunteerSpaceTaken > 1
                                        ? "s"
                                        : ""}{" "}
                                    registered
                                </Text>
                            </Flex>
                            <Flex py={2}>
                                {cardInfo.borderAge == null ? null : (
                                    <AgeBadge
                                        isAgeMinimal={cardInfo.isAgeMinimal}
                                        borderAge={cardInfo.borderAge}
                                        isAdminTheme
                                    />
                                )}
                            </Flex>
                        </VStack>
                    </GridItem>
                </Grid>

                <AdminModal
                    isOpen={isUnarchiveOpen}
                    onClose={onUnarchiveClose}
                    onProceed={onUnarchive}
                    header={`Are you sure you want to unarchive ${cardInfo.name}?`}
                    body="You can always archive any classes in the Programs page."
                />
                <AdminModal
                    isOpen={isDeleteOpen}
                    onClose={onDeleteClose}
                    onProceed={onDelete}
                    header={`Are you sure you want to delete ${cardInfo.name}?`}
                    body="WARNING: You cannot undo this action."
                />
            </>
        );
    };
