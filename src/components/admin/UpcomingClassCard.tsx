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
} from "@chakra-ui/react";
import { AgeBadge } from "@components/AgeBadge";
import { ClassCardInfo } from "@models/Class";
import colourTheme from "@styles/colours";
import convertToShortTimeRange from "@utils/convertToShortTimeRange";
import { weekdayToString } from "@utils/enum/weekday";
import { totalMinutes } from "@utils/time/convert";
import { useRouter } from "next/router";
import React from "react";

export type UpcomingClassCardProps = {
    cardInfo: ClassCardInfo;
};

export const UpcomingClassCard: React.FC<UpcomingClassCardProps> = ({ cardInfo }) => {
    const router = useRouter();

    return (
        <Grid
            templateColumns="repeat(4, 1fr)"
            gap={6}
            cursor={"pointer"}
            h={165}
            borderColor={colourTheme.colors.Sliver}
            borderWidth={1}
            _hover={{ borderColor: colourTheme.colors.Gray }}
            onClick={() => router.push(`/admin/class/${cardInfo.id}`)}
        >
            <GridItem alignSelf="center">
                <AspectRatio width="100%" ratio={1}>
                    <Image src={cardInfo.image} fit="cover" alt={cardInfo.name} />
                </AspectRatio>
            </GridItem>
            <GridItem colSpan={3}>
                <VStack align="left" justify="center" height="100%" spacing={3}>
                    <Flex mr="3">
                        <Heading size="md">{cardInfo.name}</Heading>
                        <Spacer />
                        {cardInfo.borderAge == null ? null : (
                            <AgeBadge
                                isAgeMinimal={cardInfo.isAgeMinimal}
                                borderAge={cardInfo.borderAge}
                                isAdminTheme
                            />
                        )}
                    </Flex>
                    <Flex>
                        <Box as="span" color={colourTheme.colors.Gray} fontSize="sm">
                            {weekdayToString(cardInfo.weekday, locale.en)}{" "}
                            {convertToShortTimeRange(
                                totalMinutes(cardInfo.startDate),
                                cardInfo.durationMinutes,
                            )}
                        </Box>
                        <Box as="span" color="gray.600" fontSize="sm" ml="1">
                            {" with Teacher " + cardInfo.teacherName}
                        </Box>
                    </Flex>
                    <Flex color={colourTheme.colors.Gray} fontSize="sm" align="">
                        <Text>
                            {cardInfo.spaceTaken} participant
                            {cardInfo.spaceTaken > 1 ? "s" : ""} registered
                        </Text>
                        <Text ml={10}>
                            {cardInfo.volunteerSpaceTaken} volunteer
                            {cardInfo.volunteerSpaceTaken > 1 ? "s" : ""} registered
                        </Text>
                    </Flex>
                </VStack>
            </GridItem>
        </Grid>
    );
};
