import React from "react";
import {
    Box,
    Wrap,
    WrapItem,
    Badge,
    Center,
    AspectRatio,
    Image,
} from "@chakra-ui/react";
import type { ProgramCardInfo } from "models/Program";
export const ProgramList: React.FC = () => {
    // TODO remove test data and get new images
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
                            key={idx}
                            _hover={{
                                borderColor: "gray.600",
                                borderWidth: 1,
                            }}
                        ></WrapItem>
                    ) : (
                        <WrapItem
                            flexBasis="300px"
                            key={idx}
                            flexGrow={1}
                            _hover={{
                                borderColor: "gray.600",
                                borderWidth: 1,
                            }}
                        >
                            <Box borderWidth="1px" width="100%">
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
                                    <Box
                                        mt="1"
                                        fontWeight="bold"
                                        as="h2"
                                        isTruncated
                                        fontSize="lg"
                                    >
                                        {item.name}
                                    </Box>

                                    <Box
                                        as="span"
                                        color="gray.600"
                                        fontSize="sm"
                                    >
                                        {item.startDate} to {item.endDate}
                                    </Box>
                                    <Box mt="2" fontSize="md">
                                        {item.description}
                                    </Box>
                                    <Box mt="2">
                                        <Badge
                                            borderRadius="full"
                                            padding="1"
                                            textTransform="capitalize"
                                            fontWeight="medium"
                                            letterSpacing="wide"
                                            backgroundColor="#0C53A0"
                                            color="white"
                                        >
                                            {item.tag}
                                        </Badge>
                                        <Badge
                                            borderRadius="full"
                                            padding="1"
                                            textTransform="capitalize"
                                            fontWeight="medium"
                                            letterSpacing="wide"
                                            backgroundColor="#0C53A0"
                                            color="white"
                                            ml="1"
                                        >
                                            {item.format}
                                        </Badge>
                                    </Box>
                                </Box>
                            </Box>
                        </WrapItem>
                    );
                })}
            </Wrap>
        </Center>
    );
};
