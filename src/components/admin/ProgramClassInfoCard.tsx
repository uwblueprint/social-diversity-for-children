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
import { updateClassArchive } from "@utils/updateClassArchive";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { AdminModal } from "./AdminModal";

export type ProgramClassInfoCard = {
    cardInfo: ClassCardInfo;
    // Role of user, determines whether to show admin options
    role: roles;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutateClasses: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
};

/**
 * Admin view program class card component used in the admin program details page
 */
export const ProgramClassInfoCard: React.FC<ProgramClassInfoCard> = ({
    cardInfo,
    role,
    mutateClasses,
}) => {
    const router = useRouter();
    const toast = useToast();
    const {
        isOpen: isArchiveOpen,
        onOpen: onArchiveOpen,
        onClose: onArchiveClose,
    } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

    const onArchive = async () => {
        await updateClassArchive(cardInfo.id, true);
        toast({
            title: "Class archived.",
            description: `${cardInfo.name} has been archived.`,
            status: "info",
            duration: 9000,
            isClosable: true,
            position: "top-right",
            variant: "left-accent",
        });
        mutateClasses();
    };
    const onDelete = async () => {
        await deleteClass(cardInfo.id);
        toast({
            title: "Class deleted.",
            description: `${cardInfo.name} has been deleted.`,
            status: "info",
            duration: 9000,
            isClosable: true,
            position: "top-right",
            variant: "left-accent",
        });
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
                        <Image src={cardInfo.image} fit="cover" alt={cardInfo.name} />
                    </AspectRatio>
                </GridItem>
                <GridItem colSpan={4} p={1}>
                    <VStack align="left" justify="center" height="100%">
                        <Flex mr="3" alignItems="baseline">
                            <Link href={`/admin/class/${cardInfo.id}`}>
                                <ChakraLink>
                                    <Heading size="md">{cardInfo.name}</Heading>
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
                                                router.push(`/admin/edit/class/${cardInfo.id}`)
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
                        <Tooltip label={cardInfo.teacherName} hasArrow placement="bottom-end">
                            <Box
                                as="span"
                                color={colourTheme.colors.Gray}
                                fontSize="sm"
                                noOfLines={1}
                            >
                                {weekdayToString(cardInfo.weekday, locale.en)}{" "}
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
                                {cardInfo.spaceTaken > 1 ? "s" : ""} registered
                            </Text>
                            <Text ml={5}>
                                {cardInfo.volunteerSpaceTaken} volunteer
                                {cardInfo.volunteerSpaceTaken > 1 ? "s" : ""} registered
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
                isOpen={isArchiveOpen}
                onClose={onArchiveClose}
                onProceed={onArchive}
                header={`Are you sure you want to archive ${cardInfo.name}?`}
                body="You can always view the archived classes in the Archive page."
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
