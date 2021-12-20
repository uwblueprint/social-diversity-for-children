import { AspectRatio, Box, Grid, GridItem, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { WaitlistCardInfo } from "@models/Enroll";
import { locale } from "@prisma/client";
import convertToShortDateRange from "@utils/convertToShortDateRange";
import convertToShortTimeRange from "@utils/convertToShortTimeRange";
import { deleteWaitlistRegistration } from "@utils/deleteWaitlistRegistration";
import { weekdayToString } from "@utils/enum/weekday";
import { totalMinutes } from "@utils/time/convert";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import { PrimaryButton } from "./SDCButton";

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
            <GridItem colSpan={3} py={3}>
                <VStack align="left" justify="center" height="100%">
                    <Box pb={2}>
                        <Heading size="md" pb={4} pr={2}>
                            {waitlistInfo.program.name} ({waitlistInfo.class.name})
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
                                    totalMinutes(waitlistInfo.class.startDate),
                                    waitlistInfo.class.durationMinutes,
                                )}
                                {" with " +
                                    t("program.teacherName", {
                                        name: waitlistInfo.class.teacherName,
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
                    <PrimaryButton
                        onClick={() =>
                            deleteWaitlistRegistration(waitlistInfo.parent, waitlistInfo.classId)
                        }
                        width={"fit-content"}
                    >
                        {t("class.waitlistCancel")}
                    </PrimaryButton>
                </VStack>
            </GridItem>
        </Grid>
    );
};
