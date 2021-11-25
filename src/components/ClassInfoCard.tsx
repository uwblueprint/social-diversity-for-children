import React from "react";
import {
    Box,
    Button,
    AspectRatio,
    Image,
    Flex,
    Divider,
    Grid,
    GridItem,
    Spacer,
    VStack,
} from "@chakra-ui/react";
import { weekdayToString } from "@utils/enum/weekday";
import { ClassCardInfo } from "@models/Class";
import convertToShortTimeRange from "@utils/convertToShortTimeRange";
import { locale, roles } from "@prisma/client";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import colourTheme from "@styles/colours";
import useMe from "@utils/hooks/useMe";
import { AgeBadge } from "./AgeBadge";

type ClassInfoProps = {
    cardInfo: ClassCardInfo;
    isEligible?: boolean;
    onClick: () => void;
    isFull: boolean;
};

/**
 *
 * @param cardInfo info for the program cards on the home page
 * @param onClick method that is called when card is clicked
 * @returns a component that displays the class card info
 */
export const ClassInfoCard: React.FC<ClassInfoProps> = ({
    cardInfo,
    isEligible,
    onClick,
    isFull,
}) => {
    const router = useRouter();
    const { t } = useTranslation("common");
    const { me } = useMe();

    return (
        <Grid
            templateColumns="repeat(4, 1fr)"
            gap={6}
            onClick={onClick}
            cursor={"pointer"}
        >
            <GridItem>
                <AspectRatio width="100%" ratio={1}>
                    <Image
                        filter={isEligible ? "none" : "grayscale(100%)"}
                        src={cardInfo.image}
                        fit="cover"
                        alt={cardInfo.name}
                    />
                </AspectRatio>
            </GridItem>
            <GridItem colSpan={3} py={3}>
                <VStack align="left" justify="center" height="100%">
                    <Flex mr="3">
                        <Box fontWeight="bold" as="h2">
                            {cardInfo.name}
                        </Box>
                        <Spacer />
                        {cardInfo.borderAge == null ? null : (
                            <AgeBadge
                                isOff={!isEligible}
                                isAgeMinimal={cardInfo.isAgeMinimal}
                                borderAge={cardInfo.borderAge}
                            />
                        )}
                    </Flex>
                    <Flex direction={{ base: "column", xl: "row" }}>
                        <Box as="span" color="gray.600" fontSize="sm" ml="1">
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
                                  (cardInfo.volunteerSpaceAvailable != 1
                                      ? "s"
                                      : "") +
                                  " available"
                                : t("program.participantSpot", {
                                      spot: cardInfo.spaceAvailable,
                                      context:
                                          cardInfo.spaceAvailable !== 1
                                              ? "plural"
                                              : "",
                                  })}
                        </Box>
                    </Flex>
                    {isFull && (
                        <Box>
                            <Divider mt={8} mb={8} mr="3" />
                            <Flex mt={3}>
                                <Box as="h2">
                                    We'll notify you once space becomes
                                    available
                                </Box>
                                <Spacer />
                                <Button
                                    border="1px"
                                    borderColor={colourTheme.colors.Blue}
                                    color={colourTheme.colors.Blue}
                                    variant="outline"
                                    mr="3"
                                    width="30%"
                                >
                                    Learn More
                                </Button>
                            </Flex>
                        </Box>
                    )}
                </VStack>
            </GridItem>
        </Grid>
    );
};
