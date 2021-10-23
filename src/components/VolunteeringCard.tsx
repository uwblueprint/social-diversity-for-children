import React from "react";
import {
    Box,
    AspectRatio,
    Image,
    Heading,
    Flex,
    Grid,
    Text,
    GridItem,
    Spacer,
    VStack,
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Link,
} from "@chakra-ui/react";
import weekdayToString from "@utils/weekdayToString";
import convertToShortTimeRange from "@utils/convertToShortTimeRange";
import colourTheme from "@styles/colours";
import convertToShortDateRange from "@utils/convertToShortDateRange";
import { HamburgerIcon } from "@chakra-ui/icons";
import { VolunteeringCardInfo } from "@models/Enroll";
import { deleteVolunteerRegistration } from "@utils/deleteVolunteerRegistration";
import { useRouter } from "next/router";
import { locale } from "@prisma/client";
import { useTranslation } from "next-i18next";
import useGetZoomLink from "@utils/useGetZoomLink";

type VolunteeringCardProps = {
    volunteeringInfo: VolunteeringCardInfo;
};

/**
 * VolunteeringCard is a single card representing an volunteer enrollment in a class
 * @param volunteeringInfo info of volunteering card
 * @returns a component that displays the volunteering card info
 */
export const VolunteeringCard: React.FC<VolunteeringCardProps> = ({
    volunteeringInfo,
}) => {
    const router = useRouter();
    const { t } = useTranslation();

    const { link } = useGetZoomLink();

    return (
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <GridItem>
                <AspectRatio width="100%" ratio={1}>
                    <Image
                        src={volunteeringInfo.class.image}
                        fit="cover"
                        alt={volunteeringInfo.class.name}
                    />
                </AspectRatio>
            </GridItem>
            <GridItem colSpan={3}>
                <VStack align="left" justify="center" height="100%">
                    <Flex mr="3">
                        <Box>
                            <Heading size="md" pb={4} pr={2}>
                                {volunteeringInfo.program.name} (
                                {volunteeringInfo.class.name})
                            </Heading>
                            <Box as="span" color="gray.600" fontSize="sm">
                                <Text>
                                    {t("time.weekday_many", {
                                        day: weekdayToString(
                                            volunteeringInfo.class.weekday,
                                            router.locale as locale,
                                        ),
                                    })}{" "}
                                    {convertToShortTimeRange(
                                        volunteeringInfo.class.startTimeMinutes,
                                        volunteeringInfo.class.durationMinutes,
                                    )}
                                    {" with " +
                                        t("program.teacherName", {
                                            name: volunteeringInfo.class
                                                .teacherName,
                                        })}
                                </Text>
                                <Text>
                                    {t("time.range", {
                                        ...convertToShortDateRange(
                                            volunteeringInfo.class.startDate,
                                            volunteeringInfo.class.endDate,
                                            router.locale as locale,
                                        ),
                                    })}
                                </Text>
                            </Box>
                        </Box>
                        <Spacer />
                        <Flex alignItems={"baseline"}>
                            <Link href={link} isExternal>
                                <Button
                                    bg={colourTheme.colors.Blue}
                                    color={"white"}
                                    mx={"auto"}
                                    my={2}
                                    borderRadius="6px"
                                    fontWeight={"normal"}
                                    _hover={{
                                        textDecoration: "none",
                                        bg: colourTheme.colors.LightBlue,
                                    }}
                                    _active={{
                                        bg: "lightgrey",
                                        outlineColor: "grey",
                                        border: "grey",
                                        boxShadow: "lightgrey",
                                    }}
                                    _focus={{
                                        outlineColor: "grey",
                                        border: "grey",
                                        boxShadow: "lightgrey",
                                    }}
                                >
                                    Join class
                                </Button>
                            </Link>
                            <Menu>
                                <MenuButton
                                    ml={1}
                                    as={IconButton}
                                    aria-label="Options"
                                    icon={<HamburgerIcon />}
                                    outline="none"
                                    bg="white"
                                />
                                <MenuList>
                                    {
                                        <>
                                            <MenuItem
                                                key={volunteeringInfo.classId}
                                                onClick={() =>
                                                    deleteVolunteerRegistration(
                                                        volunteeringInfo.volunteer,
                                                        volunteeringInfo.classId,
                                                    )
                                                }
                                            >
                                                Unregister
                                            </MenuItem>
                                        </>
                                    }
                                </MenuList>
                            </Menu>
                        </Flex>
                    </Flex>
                </VStack>
            </GridItem>
        </Grid>
    );
};
