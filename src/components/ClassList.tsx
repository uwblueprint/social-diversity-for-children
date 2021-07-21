import React, { useState } from "react";
import {
    Box,
    Flex,
    Badge,
    Center,
    AspectRatio,
    Spacer,
    Image,
    List,
    ListItem,
    VStack,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import type { ClassCardInfo } from "models/Class";
export const ClassList: React.FC<{ classInfo: ClassCardInfo[] }> = ({
    classInfo,
}) => {
    function convertToAmPm(timeInMinutes: Int) {
        return (
            ((timeInMinutes / 60) % 12).toString() +
            (timeInMinutes >= 720 ? "pm" : "am")
        );
    }
    function toTitleCase(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
    return (
        <Center width="100%">
            <List spacing="5" width="100%">
                {classInfo.map((item, idx) => {
                    return (
                        <ListItem
                            borderColor="gray.200"
                            _hover={{ borderColor: "gray.600" }}
                            borderWidth={2}
                        >
                            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                                <GridItem>
                                    <AspectRatio width="100%" ratio={1}>
                                        <Image
                                            src={item.image}
                                            fit="cover"
                                            alt={item.name}
                                        />
                                    </AspectRatio>
                                </GridItem>
                                <GridItem colSpan={3}>
                                    <VStack
                                        align="left"
                                        justify="center"
                                        height="100%"
                                    >
                                        <Box fontWeight="bold" as="h2">
                                            {item.name}
                                        </Box>
                                        <Box
                                            as="span"
                                            color="gray.600"
                                            fontSize="sm"
                                            textTransform="capitalize"
                                        >
                                            {toTitleCase(item.weekday)}{" "}
                                            {convertToAmPm(
                                                item.startTimeMinutes,
                                            )}
                                            -
                                            {convertToAmPm(
                                                item.startTimeMinutes +
                                                    item.durationMinutes,
                                            )}
                                        </Box>
                                        <Box
                                            as="span"
                                            color="gray.600"
                                            fontSize="sm"
                                        >
                                            Teacher {item.teacherName}
                                        </Box>
                                    </VStack>
                                </GridItem>
                                <GridItem>
                                    <Flex
                                        p="6"
                                        direction="column"
                                        justify="center"
                                        height="100%"
                                    >
                                        <Spacer />
                                        <Badge
                                            borderRadius="full"
                                            padding="1"
                                            textTransform="capitalize"
                                            backgroundColor="gray.600"
                                            color="white"
                                            textAlign="center"
                                        >
                                            {item.ageGroup}
                                        </Badge>
                                        <Spacer />
                                        <Box
                                            as="span"
                                            color="gray.600"
                                            fontSize="sm"
                                        >
                                            {item.spaceAvailable} spots
                                            available
                                        </Box>
                                        <Spacer />
                                    </Flex>
                                </GridItem>
                            </Grid>

                            {/* </Flex> */}
                        </ListItem>
                    );
                })}
            </List>
        </Center>
    );
};
