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
} from "@chakra-ui/react";
import weekdayToString from "@utils/weekdayToString";
import convertToShortTimeRange from "@utils/convertToShortTimeRange";
import { WaitlistCardInfo } from "@models/Enroll";
import colourTheme from "@styles/colours";
import convertToShortDateRange from "@utils/convertToShortDateRange";
import { deleteWaitlistRegistration } from "@utils/deleteWaitlistRegistration";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { locale } from "@prisma/client";

type WaitlistCardProps = {
    waitlistInfo: WaitlistCardInfo;
};

/**
 * WaitlistCard is a single card representing an parent waitlist in a class
 * @param waitlistInfo info of waitlist card
 * @returns a component that displays the waitlist card info
 */
export const WaitlistCard: React.FC<WaitlistCardProps> = ({ waitlistInfo }) => {
    const router = useRouter();
    const { t } = useTranslation();
    console.log("WAITLIST INFO");
    console.log(waitlistInfo);

    //const { link } = useGetZoomLink();

    return (
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <GridItem>
                <AspectRatio width="100%" ratio={1}>
                    <Image
                        src={waitlistInfo.class.image}
                        fit="cover"
                        alt={waitlistInfo.class.name}
                    />
                </AspectRatio>
            </GridItem>
            <GridItem colSpan={3}>
                <VStack align="left" justify="center" height="100%">
                    <Flex mr="3">
                        <Box>
                            <Heading size="md" pb={4} pr={2}>
                                {waitlistInfo.program.name} (
                                {waitlistInfo.class.name})
                            </Heading>
                            <Box as="span" color="gray.600" fontSize="sm">
                                <Text>
                                    {t("time.weekday_many", {
                                        day: weekdayToString(
                                            waitlistInfo.class.weekday,
                                            router.locale as locale,
                                        ),
                                    })}{" "}
                                    {convertToShortTimeRange(
                                        waitlistInfo.class.startTimeMinutes,
                                        waitlistInfo.class.durationMinutes,
                                    )}
                                    {" with " +
                                        t("program.teacherName", {
                                            name: waitlistInfo.class
                                                .teacherName,
                                        })}
                                </Text>
                                <Text>
                                    {t("time.range", {
                                        ...convertToShortDateRange(
                                            waitlistInfo.class.startDate,
                                            waitlistInfo.class.endDate,
                                            router.locale as locale,
                                        ),
                                    })}
                                </Text>
                            </Box>
                        </Box>
                        <Spacer />
                        <Flex alignItems={"baseline"}>
                            <Button
                                bg={colourTheme.colors.Blue}
                                color={"white"}
                                mx={"auto"}
                                my={2}
                                mr={5}
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
                                onClick={() =>
                                    deleteWaitlistRegistration(
                                        waitlistInfo.parent,
                                        waitlistInfo.classId,
                                    )
                                }
                            >
                                Remove from Waitlist
                            </Button>
                        </Flex>
                    </Flex>
                </VStack>
            </GridItem>
        </Grid>
    );
};
