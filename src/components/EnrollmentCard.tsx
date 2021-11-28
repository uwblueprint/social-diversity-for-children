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
    MenuDivider,
    Link,
    useBreakpointValue,
} from "@chakra-ui/react";
import { weekdayToString } from "@utils/enum/weekday";
import convertToShortTimeRange from "@utils/convertToShortTimeRange";
import { CombinedEnrollmentCardInfo } from "@models/Enroll";
import colourTheme from "@styles/colours";
import convertToShortDateRange from "@utils/convertToShortDateRange";
import { HamburgerIcon } from "@chakra-ui/icons";
import convertToListDisplay from "@utils/convertToListDisplay";
import {
    deleteClassRegistration,
    deleteClassRegistrations,
} from "@utils/deleteClassRegistration";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { locale } from "@prisma/client";
import useGetZoomLink from "@utils/hooks/useGetZoomLink";

type EnrollmentCardProps = {
    enrollmentInfo: CombinedEnrollmentCardInfo;
    isOnlyStudent?: boolean;
};

/**
 * EnrollmentCard is a single card representing an parent enrollment in a class
 * @param enrollmentInfo info of enrollment card
 * @param isOnlyStudent if this card has multiple different children in it
 * @returns a component that displays the enrollment card info
 */
export const EnrollmentCard: React.FC<EnrollmentCardProps> = ({
    enrollmentInfo,
    isOnlyStudent,
}) => {
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
                        src={enrollmentInfo.class.image}
                        fit="cover"
                        alt={enrollmentInfo.class.name}
                    />
                </AspectRatio>
            </GridItem>
            <GridItem colSpan={3} py={3}>
                <VStack align="left" justify="center" height="100%">
                    <Flex mr="3">
                        <Box>
                            <Heading size="md" pb={4} pr={2}>
                                {enrollmentInfo.program.name} (
                                {enrollmentInfo.class.name})
                            </Heading>
                            <Box as="span" color="gray.600" fontSize="sm">
                                <Text>
                                    {t("time.weekday_many", {
                                        day: weekdayToString(
                                            enrollmentInfo.class.weekday,
                                            router.locale as locale,
                                        ),
                                    })}{" "}
                                    {convertToShortTimeRange(
                                        enrollmentInfo.class.startTimeMinutes,
                                        enrollmentInfo.class.durationMinutes,
                                    )}
                                    {" with " +
                                        t("program.teacherName", {
                                            name: enrollmentInfo.class.teacherName,
                                        })}
                                </Text>
                                <Text>
                                    {t("time.range", {
                                        ...convertToShortDateRange(
                                            enrollmentInfo.class.startDate,
                                            enrollmentInfo.class.endDate,
                                            router.locale as locale,
                                        ),
                                    })}
                                </Text>
                            </Box>
                            {isOnlyStudent ? null : (
                                <Text pt={4}>
                                    Participants:{" "}
                                    {convertToListDisplay(
                                        enrollmentInfo.students.map(
                                            (student) => student.firstName,
                                        ),
                                    )}
                                </Text>
                            )}
                            {isJoinBesideTitle ? null : joinLink}
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
                                    {enrollmentInfo.students.map((student) => (
                                        <Box
                                            key={`${enrollmentInfo.classId}-${student.id}`}
                                        >
                                            <MenuItem
                                                onClick={() =>
                                                    deleteClassRegistration(
                                                        student,
                                                        enrollmentInfo.classId,
                                                    )
                                                }
                                            >
                                                {t("class.unregisterFor", {
                                                    name: student.firstName,
                                                })}
                                            </MenuItem>
                                            {enrollmentInfo.students.length <
                                            2 ? null : (
                                                <MenuDivider />
                                            )}
                                        </Box>
                                    ))}
                                    {enrollmentInfo.students.length < 2 ? null : (
                                        <MenuItem
                                            onClick={() =>
                                                deleteClassRegistrations(
                                                    enrollmentInfo.students,
                                                    enrollmentInfo.classId,
                                                )
                                            }
                                        >
                                            <Text fontWeight="bold">
                                                {t("class.unregisterForAll")}
                                            </Text>
                                        </MenuItem>
                                    )}
                                </MenuList>
                            </Menu>
                        </Flex>
                    </Flex>
                </VStack>
            </GridItem>
        </Grid>
    );
};
