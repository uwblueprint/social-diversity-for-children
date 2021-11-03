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
    Button,
    Icon,
} from "@chakra-ui/react";
import { ClassCardInfo } from "@models/Class";
import colourTheme from "@styles/colours";
import convertToShortTimeRange from "@utils/convertToShortTimeRange";
import { weekdayToString } from "@utils/enum/weekday";
import { useRouter } from "next/router";
import React from "react";
import { IoEllipsisVertical } from "react-icons/io5";

export type ClassViewInfoCard = {
    cardInfo: ClassCardInfo;
};

export const ClassViewInfoCard: React.FC<ClassViewInfoCard> = ({
    cardInfo,
}) => {
    return (
        <Grid
            templateColumns="repeat(5, 1fr)"
            gap={6}
            minH={165}
            w={1000}
            borderColor={colourTheme.colors.Sliver}
            borderWidth={1}
        >
            <GridItem alignSelf="center" maxW={200}>
                <AspectRatio width="100%" ratio={1}>
                    <Image
                        src={cardInfo.image}
                        fit="cover"
                        alt={cardInfo.name}
                    />
                </AspectRatio>
            </GridItem>
            <GridItem colSpan={4}>
                <VStack align="left" justify="center" height="100%" spacing={3}>
                    <Flex mr="3" alignItems="baseline">
                        <Heading size="md">{cardInfo.name}</Heading>
                        <Spacer />
                        {/* TODO: Make this a component */}
                        <Button borderRadius="full" p={2}>
                            <Icon as={IoEllipsisVertical} />
                        </Button>
                    </Flex>
                    <Flex>
                        <Box
                            as="span"
                            color={colourTheme.colors.Gray}
                            fontSize="sm"
                        >
                            {weekdayToString(cardInfo.weekday, locale.en)}{" "}
                            {convertToShortTimeRange(
                                cardInfo.startTimeMinutes,
                                cardInfo.durationMinutes,
                            )}
                        </Box>
                        <Box as="span" color="gray.600" fontSize="sm" ml="1">
                            {" with Teacher " + cardInfo.teacherName}
                        </Box>
                    </Flex>
                    <Flex fontSize="sm" pr={20}>
                        <Text>{cardInfo.description}</Text>
                    </Flex>
                </VStack>
            </GridItem>
        </Grid>
    );
};
