import React, { useState } from "react";
import { Heading, Flex, Badge, Spacer, Text, Button } from "@chakra-ui/react";
import type { ClassCardInfo } from "models/Class";
import { ClassList } from "src/components/ClassList";
export const ProgramDetailsPage: React.FC = () => {
    // TODO remove test data and get new images
    const classInfo: ClassCardInfo[] = [
        {
            image: "https://i.pinimg.com/originals/4b/ce/8a/4bce8a95dcd0cab2e2622775835281d4.png",
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
    // TODO this will be a ProgramCardInfo (once the reverted PR gets unreverted)
    const programInfo = {
        name: "Building Bridges with Music",
        description:
            "Children with special needs will be able to connect with the music teacher through an online video call to socialize and have fun while learning about music!",
        image: "",
        startDate: "July 7, 2021",
        endDate: "August 28, 2021",
        tag: "Music",
        format: "Online",
    };

    return (
        <Flex direction="column">
            <Flex align="center">
                <Heading>{programInfo.name}</Heading>
                <Spacer />
                <Badge
                    marginRight="2"
                    borderRadius="full"
                    padding="1"
                    textTransform="capitalize"
                    backgroundColor="gray.600"
                    color="white"
                    textAlign="center"
                >
                    {programInfo.format}
                </Badge>
                <Badge
                    borderRadius="full"
                    padding="1"
                    textTransform="capitalize"
                    backgroundColor="gray.600"
                    color="white"
                    textAlign="center"
                >
                    {programInfo.tag}
                </Badge>
            </Flex>
            <Text as="span" color="gray.600" fontSize="sm" mt="5">
                {programInfo.startDate} to {programInfo.endDate}
            </Text>
            <Text mt="5">{programInfo.description}</Text>
            <Flex mt="5" align="center">
                <Text fontSize="sm" fontWeight="semibold">
                    Select a class
                </Text>
                <Spacer />
                {/* TODO what is the filter button supposed to do? */}
                <Button
                    fontSize="sm"
                    backgroundColor="transparent"
                    borderColor="gray.600"
                    borderWidth="1"
                >
                    Filter
                </Button>
            </Flex>
            <ClassList classInfo={classInfo} />
        </Flex>
    );
};
