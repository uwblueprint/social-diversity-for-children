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
} from "@chakra-ui/react";
import { weekdayToString } from "@utils/enum/weekday";
import convertToShortTimeRange from "@utils/convertToShortTimeRange";
import convertToShortDateRange from "@utils/convertToShortDateRange";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { locale } from "@prisma/client";
import { ClassCardInfo } from "@models/Class";
import { SDCBadge } from "./SDCBadge";

type FormClassCardProps = {
    classInfo: ClassCardInfo;
};

export const FormClassCard: React.FC<FormClassCardProps> = ({ classInfo }) => {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <Grid border="1px solid #C5C5C5" templateColumns="repeat(4, 1fr)" gap={6}>
            <GridItem>
                <AspectRatio width="100%" ratio={1}>
                    <Image src={classInfo.image} fit="cover" alt={classInfo.name} />
                </AspectRatio>
            </GridItem>
            <GridItem colSpan={3}>
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
                                        classInfo.startTimeMinutes,
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
                        </Box>
                        <Spacer />
                        <Flex alignItems={"baseline"}>
                            <SDCBadge>
                                {t(
                                    classInfo.isAgeMinimal
                                        ? "program.ageGroupAbove"
                                        : "program.ageGroupUnder",
                                    {
                                        age: classInfo.borderAge,
                                    },
                                )}
                            </SDCBadge>
                        </Flex>
                    </Flex>
                </VStack>
            </GridItem>
        </Grid>
    );
};
