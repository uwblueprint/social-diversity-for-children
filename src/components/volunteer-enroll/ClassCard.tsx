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
    Button,
} from "@chakra-ui/react";
import { SDCBadge } from "@components/SDCBadge";
import weekdayToString from "@utils/weekdayToString";
import { ClassCardInfo } from "@models/Class";
import convertToShortTimeRange from "@utils/convertToShortTimeRange";

type ClassCardProps = {
    cardInfo: ClassCardInfo;
};

/**
 *
 * @param cardInfo info for the program cards on the home page
 * @param onClick method that is called when card is clicked
 * @returns a component that displays the class card info
 */
export const ClassCard: React.FC<ClassCardProps> = ({ cardInfo }) => {
    return (
        <>
            <Grid
                border="1px solid #C5C5C5"
                templateColumns="repeat(4, 1fr)"
                gap={6}
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
                            <Box
                                as="span"
                                color="gray.600"
                                fontSize="sm"
                                ml="1"
                            >
                                {" with Teacher " + cardInfo.teacherName}
                            </Box>
                        </Flex>
                        <Flex>
                            <Box
                                as="span"
                                color="gray.600"
                                fontSize="sm"
                                textTransform="capitalize"
                            >
                                {cardInfo.startDate.toString().substring(4, 15)}
                                {" to "}
                                {cardInfo.endDate.toString().substring(4, 15)}
                            </Box>
                        </Flex>
                    </VStack>
                </GridItem>
            </Grid>
        </>
    );
};
