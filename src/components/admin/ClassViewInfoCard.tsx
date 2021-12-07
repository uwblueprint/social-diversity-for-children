import { locale, roles } from "@prisma/client";
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
    useDisclosure,
} from "@chakra-ui/react";
import { ClassCardInfo } from "@models/Class";
import colourTheme from "@styles/colours";
import convertToShortTimeRange from "@utils/convertToShortTimeRange";
import { deleteClass } from "@utils/deleteClass";
import { weekdayToString } from "@utils/enum/weekday";
import { updateClassArchive } from "@utils/updateClassArchive";
import { useRouter } from "next/router";
import React from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { AdminModal } from "./AdminModal";
import { infoToastOptions } from "@utils/toast/options";
import { totalMinutes } from "@utils/time/convert";

export type ClassViewInfoCard = {
    cardInfo: ClassCardInfo;
    // Role of user, determines to show admin options
    role: roles;
};

/**
 * Admin view class card component used in the admin class details page
 */
export const ClassViewInfoCard: React.FC<ClassViewInfoCard> = ({ cardInfo, role }) => {
    const router = useRouter();
    const toast = useToast();

    const {
        isOpen: isArchiveOpen,
        onOpen: onArchiveOpen,
        onClose: onArchiveClose,
    } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

    const onArchive = () => {
        updateClassArchive(cardInfo.id, true);
        toast(infoToastOptions("Class archived.", `${cardInfo.name} has been archived.`));
        router.push(`/admin/program/${cardInfo.programId}`);
    };
    const onDelete = () => {
        deleteClass(cardInfo.id);
        toast(infoToastOptions("Class deleted.", `${cardInfo.name} has been deleted.`));
        router.push(`/admin/program/${cardInfo.programId}`);
    };

    return (
        <>
            <Grid
                templateColumns="repeat(5, 1fr)"
                gap={6}
                minH={165}
                borderColor={colourTheme.colors.Sliver}
                borderWidth={1}
            >
                <GridItem alignSelf="center" maxW={200}>
                    <AspectRatio width="100%" ratio={1}>
                        <Image src={cardInfo.image} fit="cover" alt={cardInfo.name} />
                    </AspectRatio>
                </GridItem>
                <GridItem colSpan={4} p={5}>
                    <VStack align="left" justify="center" height="100%" spacing={3}>
                        <Flex mr="3" alignItems="baseline">
                            <Heading size="md">{cardInfo.name}</Heading>
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
                                                router.push(`/admin/class/edit/${cardInfo.id}`)
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
                                {weekdayToString(cardInfo.weekday, locale.en)}{" "}
                                {convertToShortTimeRange(
                                    totalMinutes(cardInfo.startDate),
                                    cardInfo.durationMinutes,
                                )}
                            </Box>
                            <Box as="span" color="gray.600" fontSize="sm" ml="1">
                                {" with Teacher " + cardInfo.teacherName}
                            </Box>
                        </Flex>
                        <Flex fontSize="sm" pr={20}>
                            <Text>{cardInfo.description}</Text>
                        </Flex>
                    </VStack>
                </GridItem>
            </Grid>

            <AdminModal
                isOpen={isArchiveOpen}
                onClose={onArchiveClose}
                onProceed={onArchive}
                header="Are you sure you want to archive this class?"
                body="You can always view the archived classes in the Archive page."
            />
            <AdminModal
                isOpen={isDeleteOpen}
                onClose={onDeleteClose}
                onProceed={onDelete}
                header="Are you sure you want to delete this class and its registrations?"
                body="WARNING: You cannot undo this action."
            />
        </>
    );
};
