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
    useBreakpointValue,
} from "@chakra-ui/react";
import { weekdayToString } from "@utils/enum/weekday";
import convertToShortTimeRange from "@utils/convertToShortTimeRange";
import colourTheme from "@styles/colours";
import convertToShortDateRange from "@utils/convertToShortDateRange";
import { HamburgerIcon } from "@chakra-ui/icons";
import { VolunteeringCardInfo } from "@models/Enroll";
import { deleteVolunteerRegistration } from "@utils/deleteVolunteerRegistration";
import { useRouter } from "next/router";
import { locale } from "@prisma/client";
import { useTranslation } from "next-i18next";
import useGetZoomLink from "@utils/hooks/useGetZoomLink";
import { totalMinutes } from "@utils/time/convert";

type VolunteeringCardProps = {
    volunteeringInfo: VolunteeringCardInfo;
};

// TODO: make sure that the card is responsive like enrollment card
/**
 * VolunteeringCard is a single card representing an volunteer enrollment in a class
 * @param volunteeringInfo info of volunteering card
 * @returns a component that displays the volunteering card info
 */
export const VolunteeringCard: React.FC<VolunteeringCardProps> = ({ volunteeringInfo }) => {
    const router = useRouter();
    const { t } = useTranslation("common");
    const isJoinBesideTitle = useBreakpointValue({ base: false, md: true });

    const { link } = useGetZoomLink();

    const joinLink = (
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
                {t("class.joinClass")}
            </Button>
        </Link>
    );

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
            <GridItem colSpan={3} py={3}>
                <VStack align="left" justify="center" height="100%">
                    <Flex mr="3">
                        <Box>
                            <Heading size="md" pb={4} pr={2}>
                                {volunteeringInfo.program.name} ({volunteeringInfo.class.name})
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
                                        totalMinutes(volunteeringInfo.class.startDate),
                                        volunteeringInfo.class.durationMinutes,
                                    )}
                                    {" with " +
                                        t("program.teacherName", {
                                            name: volunteeringInfo.class.teacherName,
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
                                {isJoinBesideTitle ? null : joinLink}
                            </Box>
                        </Box>
                        <Spacer />
                        <Flex alignItems={"baseline"}>
                            {isJoinBesideTitle ? joinLink : null}
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
                                                {t("class.unregister")}
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
