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
    useToast,
    VStack,
} from "@chakra-ui/react";
import { AdminBadge } from "@components/AdminBadge";
import { ProgramCardInfo } from "@models/Program";
import colourTheme from "@styles/colours";
import convertToShortDateRange from "@utils/convertToShortDateRange";
import { deleteClass } from "@utils/deleteClass";
import { updateClassArchive } from "@utils/updateClassArchive";
import { useRouter } from "next/router";
import React from "react";
import { IoEllipsisVertical } from "react-icons/io5";

export type ProgramViewInfoCard = {
    cardInfo: ProgramCardInfo;
};

/**
 * Admin view class card component used in the admin class details page
 */
export const ProgramViewInfoCard: React.FC<ProgramViewInfoCard> = ({
    cardInfo,
}) => {
    const router = useRouter();
    const toast = useToast();
    const { start, end } = convertToShortDateRange(
        cardInfo.startDate,
        cardInfo.endDate,
        locale.en,
    );

    return (
        <Grid
            templateColumns="repeat(5, 1fr)"
            gap={4}
            minH={165}
            borderColor={colourTheme.colors.Sliver}
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
                                <MenuItem
                                    onClick={() => {
                                        deleteClass(cardInfo.id);
                                        toast({
                                            title: "Class deleted.",
                                            description: `${cardInfo.name} has been deleted.`,
                                            status: "info",
                                            duration: 9000,
                                            isClosable: true,
                                            position: "top-right",
                                            variant: "left-accent",
                                        });
                                        router.push("/admin");
                                    }}
                                >
                                    Delete
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem
                                    onClick={() => {
                                        updateClassArchive(cardInfo.id, true);
                                        toast({
                                            title: "Class archived.",
                                            description: `${cardInfo.name} has been archived.`,
                                            status: "info",
                                            duration: 9000,
                                            isClosable: true,
                                            position: "top-right",
                                            variant: "left-accent",
                                        });
                                        router.push("/admin");
                                    }}
                                >
                                    Archive
                                </MenuItem>
                            </MenuList>
                        </Menu>
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
                        <Tooltip label={cardInfo.description}>
                            <Text noOfLines={3}>{cardInfo.description}</Text>
                        </Tooltip>
                    </Flex>
                    <Flex>
                        <AdminBadge>{cardInfo.tag}</AdminBadge>
                        <AdminBadge ml={2}>{cardInfo.onlineFormat}</AdminBadge>
                    </Flex>
                </VStack>
            </GridItem>
        </Grid>
    );
};
