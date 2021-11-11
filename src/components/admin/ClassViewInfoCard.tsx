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

export type ClassViewInfoCard = {
    cardInfo: ClassCardInfo;
};

/**
 * Admin view class card component used in the admin class details page
 */
export const ClassViewInfoCard: React.FC<ClassViewInfoCard> = ({
    cardInfo,
}) => {
    const router = useRouter();
    const toast = useToast();

    return (
        <Grid
            templateColumns="repeat(5, 1fr)"
            gap={6}
            minH={165}
            w={1000}
            borderColor={colourTheme.colors.Sliver}
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
            <GridItem colSpan={4}>
                <VStack align="left" justify="center" height="100%" spacing={3}>
                    <Flex mr="3" alignItems="baseline">
                        <Heading size="md">{cardInfo.name}</Heading>
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
                            {weekdayToString(cardInfo.weekday, locale.en)}{" "}
                            {convertToShortTimeRange(
                                cardInfo.startTimeMinutes,
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
    );
};
