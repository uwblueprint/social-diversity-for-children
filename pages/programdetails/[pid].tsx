import { useRouter } from "next/router";
import React from "react";
import { Heading, Flex, Badge, Spacer, Text, Button } from "@chakra-ui/react";
import type { ClassCardInfo } from "models/Class";
import { ClassList } from "src/components/ClassList";
import { weekday } from "@prisma/client";
import Wrapper from "@components/SDCWrapper";
import { useSession } from "next-auth/client";
import { BackButton } from "@components/BackButton";

export const ProgramDetails: React.FC = () => {
    const [session, loading] = useSession();
    const router = useRouter();
    const { pid } = router.query;
    const programName: string = typeof pid === "string" ? pid : "";
    // TODO remove test data and get new images
    const classInfo: { [programId: string]: ClassCardInfo[] } = {
        "0": [
            {
                image: "https://i.pinimg.com/originals/4b/ce/8a/4bce8a95dcd0cab2e2622775835281d4.png",
                name: "Singing Monkeys",
                ageGroup: "9 & Under",
                spaceAvailable: 5,
                volunteerSpaceAvailable: 4,
                weekday: weekday.WED,
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
                weekday: weekday.THU,
                startTimeMinutes: 1110,
                durationMinutes: 60,
                teacherName: "Brian",
            },
        ],
        "1": [
            {
                image: "https://media.giphy.com/media/jEyKIvmt0BgLC/giphy.gif",
                name: "Class 1",
                ageGroup: "10 & Under",
                spaceAvailable: 2,
                volunteerSpaceAvailable: 4,
                weekday: weekday.MON,
                startTimeMinutes: 1234,
                durationMinutes: 60,
                teacherName: "Teacher1",
            },
            {
                image: "https://i.pinimg.com/originals/fb/f7/64/fbf76458d74b5236cb7ee9208563bebc.gif",
                name: "Class 2",
                ageGroup: "10 & Under",
                spaceAvailable: 1,
                volunteerSpaceAvailable: 4,
                weekday: weekday.THU,
                startTimeMinutes: 765,
                durationMinutes: 60,
                teacherName: "Teacher2",
            },
        ],
    };
    // TODO this will be a ProgramCardInfo (once the reverted PR gets unreverted)
    const programInfo: { [programId: string]: any } = {
        "0": {
            name: "Building Bridges with Music",
            description:
                "Children with special needs will be able to connect with the music teacher through an online video call to socialize and have fun while learning about music!",
            image: "",
            startDate: "July 7, 2021",
            endDate: "August 28, 2021",
            tag: "Music",
            format: "Online",
        },
        "1": {
            name: "Education Through Creativity",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: "",
            startDate: "July 7, 2021",
            endDate: "August 28, 2021",
            tag: "Art",
            format: "Online",
        },
    };

    return programName in programInfo ? (
        <Wrapper session={session}>
            <BackButton />
            <Flex direction="column" pt={4} pb={8}>
                <Flex align="center">
                    <Heading>{programInfo[programName].name}</Heading>
                    <Spacer />
                    <Badge
                        borderRadius="full"
                        textTransform="capitalize"
                        fontWeight="medium"
                        letterSpacing="wide"
                        backgroundColor="#0C53A0"
                        color="white"
                        pb="1"
                        pt="1.5"
                        px="3"
                    >
                        {programInfo[programName].format}
                    </Badge>
                    <Badge
                        borderRadius="full"
                        textTransform="capitalize"
                        fontWeight="medium"
                        letterSpacing="wide"
                        backgroundColor="#0C53A0"
                        color="white"
                        pb="1"
                        pt="1.5"
                        px="3"
                        ml="2"
                    >
                        {programInfo[programName].tag}
                    </Badge>
                </Flex>
                <Text as="span" color="gray.600" fontSize="sm" mt="5">
                    {programInfo[programName].startDate} to{" "}
                    {programInfo[programName].endDate}
                </Text>
                <Text mt="5">{programInfo[programName].description}</Text>
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
                <ClassList classInfo={classInfo[programName]} />
            </Flex>
        </Wrapper>
    ) : (
        <Text>Index {programName} doesn't have test data yet</Text>
    );
};

export default ProgramDetails;
