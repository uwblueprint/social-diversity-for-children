import React, { useState } from "react";
import {
    Box,
    Heading,
    Wrap,
    WrapItem,
    Flex,
    Badge,
    Center,
    AspectRatio,
    Spacer,
    Image,
    List,
    ListItem,
    VStack,
} from "@chakra-ui/react";
import type { ClassCardInfo } from "models/Class";
export const ProgramDetails: React.FC = () => {
    // TODO remove test data and get new images
    const classInfo: ClassCardInfo[] = [
        {
            image: "https://cdn.icon-icons.com/icons2/1465/PNG/512/440monkey_100806.png",
            name: "Singing Monkeys",
            ageGroup: "9 & Under",
            spaceAvailable: 5,
            volunteerSpaceAvailable: 4,
            weekday: "Wednesday",
            startTimeMinutes: 1080,
            durationMinutes: 60,
            teacherName: "Brian",
        },
        {
            image: "https://image.flaticon.com/icons/png/512/2395/2395826.png",
            name: "Singing Giraffes",
            ageGroup: "9 & Under",
            spaceAvailable: 5,
            volunteerSpaceAvailable: 4,
            weekday: "Thursday",
            startTimeMinutes: 1080,
            durationMinutes: 60,
            teacherName: "Brian",
        },
    ];

    return (
        <Center>
            <List>
                {classInfo.map((item, idx) => {
                    return (
                        <ListItem>
                            <Flex
                                borderWidth="1px"
                                width="100%"
                                key={idx}
                                data-index={idx}
                            >
                                <AspectRatio width="100%" ratio={1}>
                                    <Image
                                        src={item.image}
                                        boxSize="100"
                                        key={idx}
                                        data-index={idx}
                                        fit="cover"
                                        alt={item.name}
                                    />
                                </AspectRatio>
                                <VStack p="6" flexGrow={3}>
                                    <Box
                                        mt="1"
                                        fontWeight="semibold"
                                        as="h3"
                                        lineHeight="tight"
                                        isTruncated
                                    >
                                        {item.name}
                                    </Box>
                                    <Box
                                        as="span"
                                        color="gray.600"
                                        fontSize="sm"
                                    >
                                        {item.weekday}s{" "}
                                        {(item.startTimeMinutes / 60) % 12}{" "}
                                        {item.startTimeMinutes >= 720
                                            ? "pm"
                                            : "am"}{" "}
                                        -{" "}
                                        {((item.startTimeMinutes +
                                            item.durationMinutes) /
                                            60) %
                                            12}{" "}
                                        {item.startTimeMinutes +
                                            item.durationMinutes >=
                                        720
                                            ? "pm"
                                            : "am"}
                                    </Box>
                                    <Box
                                        as="span"
                                        color="gray.600"
                                        fontSize="sm"
                                    >
                                        Teacher {item.teacherName}
                                    </Box>
                                </VStack>
                                <VStack>
                                    <Badge
                                        borderRadius="full"
                                        padding="1"
                                        textTransform="capitalize"
                                        fontWeight="medium"
                                        letterSpacing="wide"
                                        backgroundColor="gray.600"
                                        color="white"
                                    >
                                        {item.ageGroup}
                                    </Badge>
                                    <Box
                                        as="span"
                                        color="gray.600"
                                        fontSize="sm"
                                    >
                                        {item.spaceAvailable} spots available
                                    </Box>
                                </VStack>
                            </Flex>
                        </ListItem>
                    );
                })}
            </List>
        </Center>
    );
};
