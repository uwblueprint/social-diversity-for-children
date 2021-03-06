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
    useBreakpointValue,
} from "@chakra-ui/react";
import { weekdayToString } from "@utils/enum/weekday";
import convertToShortTimeRange from "@utils/convertToShortTimeRange";
import convertToShortDateRange from "@utils/convertToShortDateRange";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { locale } from "@prisma/client";
import { ClassCardInfo } from "@models/Class";
import { AgeBadge } from "./AgeBadge";
import { totalMinutes } from "@utils/time/convert";

type FormClassCardProps = {
    classInfo: ClassCardInfo;
};

export const FormClassCard: React.FC<FormClassCardProps> = ({ classInfo }) => {
    const router = useRouter();
    const { t } = useTranslation();

    const isAgeBadgeBesideTitle = useBreakpointValue({ base: false, md: true });

    return (
        <Grid border="1px solid #C5C5C5" templateColumns="repeat(4, 1fr)" gap={6}>
            <GridItem>
                <AspectRatio width="100%" ratio={1}>
                    <Image src={classInfo.image} fit="cover" alt={classInfo.name} />
                </AspectRatio>
            </GridItem>
            <GridItem colSpan={3} py={3}>
                <VStack align="left" justify="center" height="100%">
                    <Flex mr="3">
                        <Box>
                            <Heading size="md" pb={4} pr={2}>
                                {classInfo.name}
                            </Heading>

                            <Box as="span" color="gray.600" fontSize="sm">
                                <Text>
                                    {t("time.weekday_many", {
                                        day: weekdayToString(
                                            classInfo.weekday,
                                            router.locale as locale,
                                        ),
                                    })}{" "}
                                    {convertToShortTimeRange(
                                        totalMinutes(classInfo.startDate),
                                        classInfo.durationMinutes,
                                    )}
                                    {" with " +
                                        t("program.teacherName", {
                                            name: classInfo.teacherName,
                                        })}
                                </Text>
                                <Text>
                                    {t("time.range", {
                                        ...convertToShortDateRange(
                                            classInfo.startDate,
                                            classInfo.endDate,
                                            router.locale as locale,
                                        ),
                                    })}
                                </Text>
                            </Box>
                            {isAgeBadgeBesideTitle ? null : (
                                <AgeBadge
                                    borderAge={classInfo.borderAge}
                                    isAgeMinimal={classInfo.isAgeMinimal}
                                    mt={3}
                                />
                            )}
                        </Box>
                        <Spacer />
                        {!isAgeBadgeBesideTitle ? null : (
                            <Flex alignItems={"baseline"}>
                                <AgeBadge
                                    borderAge={classInfo.borderAge}
                                    isAgeMinimal={classInfo.isAgeMinimal}
                                />
                            </Flex>
                        )}
                    </Flex>
                </VStack>
            </GridItem>
        </Grid>
    );
};
