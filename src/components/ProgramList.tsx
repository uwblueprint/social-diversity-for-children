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
} from "@chakra-ui/react";
import type { ProgramCardInfo } from "@models/Program";
export const ProgramList: React.FC = () => {
    // TODO remove this, this is for testing onclick functions
    const handleClick = (event) => {
        event.preventDefault();
        console.log(event.target);
        alert(
            `clicked: ${
                imagesAndDescriptions[event.target.getAttribute("data-index")]
                    .name
            }`,
        );
    };
    const imagesAndDescriptions: ProgramCardInfo[] = [
        {
            image: "https://i.imgur.com/UaEscmK.jpeg",
            name: "Building Bridges with Music",
            description:
                "Children with special needs will be able to connect with the music teacher through an online video call to socialize and have fun while learning about music!",
            startDate: "July 7, 2021",
            endDate: "August 28, 2021",
            format: "online",
            tag: "art",
        },
        {
            image: "https://i.kym-cdn.com/entries/icons/original/000/026/489/crying.jpg",
            name: "MPM/JELIC",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            startDate: "July 7, 2021",
            endDate: "August 28, 2021",
            format: "blended",
            tag: "music",
        },
        {
            image: "https://metro.co.uk/wp-content/uploads/2017/07/187144066.jpg?quality=90&strip=all&zoom=1&resize=644%2C428",
            name: "Education Through Creativity",
            description:
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            startDate: "July 7, 2021",
            endDate: "August 28, 2021",
            format: "online",
            tag: "math",
        },
        {
            image: "https://metro.co.uk/wp-content/uploads/2017/07/187144066.jpg?quality=90&strip=all&zoom=1&resize=644%2C428",
            name: "Education Through Creativity",
            description:
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            startDate: "July 7, 2021",
            endDate: "August 28, 2021",
            format: "online",
            tag: "math",
        },
        {
            name: "placeholder",
            image: "",
            description: "",
            startDate: "",
            endDate: "",
            format: "",
            tag: "",
        },
        {
            name: "placeholder",
            image: "",
            description: "",
            startDate: "",
            endDate: "",
            format: "",
            tag: "",
        },
    ];

    return (
        <Center>
            <Wrap spacing="50px" justify="space-between">
                {imagesAndDescriptions.map((item, idx) => {
                    return item.name == "placeholder" ? (
                        <WrapItem
                            flexBasis="300px"
                            flexGrow={1}
                            display="hidden"
                        ></WrapItem>
                    ) : (
                        <WrapItem flexBasis="300px" flexGrow={1}>
                            <Box
                                borderWidth="1px"
                                width="100%"
                                key={idx}
                                data-index={idx}
                                onClick={handleClick}
                            >
                                <AspectRatio width="100%" ratio={4 / 2}>
                                    <Image
                                        src={item.image}
                                        boxSize="200"
                                        key={idx}
                                        data-index={idx}
                                        fit="cover"
                                        alt={item.name}
                                    />
                                </AspectRatio>

                                <Box p="6">
                                    <Box d="flex" alignItems="baseline">
                                        <Box
                                            mt="1"
                                            fontWeight="semibold"
                                            as="h3"
                                            lineHeight="tight"
                                            isTruncated
                                        >
                                            {item.name}
                                        </Box>
                                        <Spacer />
                                        <Badge
                                            borderRadius="full"
                                            padding="1"
                                            textTransform="capitalize"
                                            fontWeight="medium"
                                            letterSpacing="wide"
                                            backgroundColor="gray.600"
                                            color="white"
                                        >
                                            {item.tag}
                                        </Badge>
                                        <Badge
                                            fontWeight="medium"
                                            borderRadius="full"
                                            backgroundColor="gray.600"
                                            color="white"
                                            letterSpacing="wide"
                                            ml="2"
                                            padding="1"
                                            textTransform="capitalize"
                                        >
                                            {item.format}
                                        </Badge>
                                    </Box>
                                    <Box
                                        as="span"
                                        color="gray.600"
                                        fontSize="sm"
                                    >
                                        {item.startDate} to {item.endDate}
                                    </Box>
                                    <Box mt="2">{item.description}</Box>
                                </Box>
                            </Box>
                        </WrapItem>
                    );
                })}
            </Wrap>
        </Center>
    );
};
