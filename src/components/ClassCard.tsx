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

type ClassCardProps = {
    cardInfo: ClassCardInfo;
    onClick: () => void;
};

/**
 *
 * @param cardInfo info for the program cards on the home page
 * @returns a component with all the cards for each of the programs in the database
 */
export const ClassCard: React.FC<ClassCardProps> = ({ cardInfo, onClick }) => {
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
                        <SDCBadge children={cardInfo.ageGroup} />
                    </Flex>
                    <Flex>
                        <Box
                            as="span"
                            color="gray.600"
                            fontSize="sm"
                            textTransform="capitalize"
                        >
                            {weekdayToString(cardInfo.weekday)}
                            {"s "}
                            {convertToShortTimeRange(
                                cardInfo.startTimeMinutes,
                                cardInfo.durationMinutes,
                            )}
                        </Box>
                        <Box as="span" color="gray.600" fontSize="sm" ml="1">
                            {" with Teacher " + cardInfo.teacherName}
                        </Box>
                        <Spacer />
                        <Box mr="3" as="span" color="gray.600" fontSize="sm">
                            {cardInfo.spaceAvailable} participant spot
                            {cardInfo.spaceAvailable > 1 ? "s" : ""} available
                        </Box>
                    </Flex>
                </VStack>
            </GridItem>
        </Grid>
    );
};
