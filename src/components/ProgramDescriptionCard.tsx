import React from "react";
import {
    Box,
    AspectRatio,
    Image,
    Flex,
    Grid,
    GridItem,
    Spacer,
    VStack,
} from "@chakra-ui/react";
import { SDCBadge } from "./SDCBadge";
import weekdayToString from "@utils/weekdayToString";
import { ClassCardInfo } from "@models/Class";
import convertToShortTimeRange from "@utils/convertToShortTimeRange";
import { locale, roles } from "@prisma/client";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import useMe from "@utils/useMe";

type ProgramDescriptionCardProps = {
    cardInfo: ClassCardInfo;
};

/**
 *
 * @param cardInfo info for the program cards on the home page
 * @param onClick method that is called when card is clicked
 * @returns a component that displays the class card info
 */
export const ProgramDescriptionCard: React.FC<ProgramDescriptionCardProps> = ({
    cardInfo,
}) => {
    const router = useRouter();
    const { t } = useTranslation();
    const { me } = useMe();

    return (
        <Grid templateColumns="repeat(4, 1fr)" gap={6} cursor={"pointer"}>
            <GridItem>
                <AspectRatio width="100%" ratio={1}>
                    <Image
                        src={cardInfo.image}
                        fit="cover"
                        alt={cardInfo.name}
                    />
                </AspectRatio>
            </GridItem>
            <GridItem colSpan={3}>
                <VStack align="left" justify="center" height="100%">
                    <Flex mr="3">
                        <Box fontWeight="bold" as="h2">
                            {cardInfo.name}
                        </Box>
                        <Spacer />
                        {cardInfo.borderAge == null ? null : (
                            <SDCBadge>
                                {cardInfo.isAgeMinimal
                                    ? cardInfo.borderAge + " and above"
                                    : cardInfo.borderAge + " and under"}
                            </SDCBadge>
                        )}
                    </Flex>
                    <Flex>
                        <Box
                            as="span"
                            color="gray.600"
                            fontSize="sm"
                            textTransform="capitalize"
                        >
                            {t("time.weekday_many", {
                                day: weekdayToString(
                                    cardInfo.weekday,
                                    router.locale as locale,
                                ),
                            })}{" "}
                            {convertToShortTimeRange(
                                cardInfo.startTimeMinutes,
                                cardInfo.durationMinutes,
                            )}
                        </Box>
                        <Box as="span" color="gray.600" fontSize="sm" ml="1">
                            {" with " +
                                t("program.teacherName", {
                                    name: cardInfo.teacherName,
                                })}
                        </Box>
                        <Spacer />
                        <Box mr="3" as="span" color="gray.600" fontSize="sm">
                            {me && me.role === roles.VOLUNTEER
                                ? cardInfo.volunteerSpaceAvailable +
                                  " volunteer spot" +
                                  (cardInfo.volunteerSpaceAvailable > 1
                                      ? "s"
                                      : "") +
                                  " available"
                                : cardInfo.spaceAvailable +
                                  " participant spot" +
                                  (cardInfo.spaceAvailable > 1 ? "s" : "") +
                                  " available"}
                        </Box>
                    </Flex>
                </VStack>
            </GridItem>
        </Grid>
    );
};
