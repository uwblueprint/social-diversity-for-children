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
import { programFormat } from "@prisma/client";

type ProgramCardProps = {
    styleProps?: Record<string, unknown>;
    cardInfo: ProgramCardInfo[];
    session: Record<string, unknown>;
};

export const ProgramCard: React.FC<ProgramCardProps> = ({
    cardInfo,
    session,
}): JSX.Element => {
    // For spacing, when the #cards in a row < max #cards
    const placeholders: ProgramCardInfo[] = [
        {
            id: 0,
            name: "placeholder",
            image: "",
            description: "",
            startDate: new Date(),
            endDate: new Date(),
            onlineFormat: programFormat.online,
            tag: "",
            price: 0,
        },
        {
            id: 0,
            name: "placeholder",
            image: "",
            description: "",
            startDate: new Date(),
            endDate: new Date(),
            onlineFormat: programFormat.online,
            tag: "",
            price: 0,
        },
    ];

    return (
        <Center>
            <Wrap spacing="50px" justify="space-between">
                {cardInfo.concat(placeholders).map((item, idx) => {
                    return item.name == "placeholder" ? (
                        <WrapItem
                            flexBasis="300px"
                            flexGrow={1}
                            display="hidden"
                            key={idx}
                        ></WrapItem>
                    ) : (
                        <WrapItem flexBasis="300px" key={idx} flexGrow={1}>
                            <Box
                                borderWidth="1px"
                                width="100%"
                                _hover={{
                                    borderColor: "#0C53A0",
                                    borderWidth: 1,
                                }}
                                onClick={() => {
                                    if (!session)
                                        window.location.href = "/login";
                                    else
                                        window.location.href = `/program-details/${item.id}`;
                                }}
                            >
                                <AspectRatio width="100%" ratio={4 / 3}>
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
                                        {
                                            new Date(item.startDate)
                                                .toISOString()
                                                .split("T")[0]
                                        }{" "}
                                        to{" "}
                                        {
                                            new Date(item.endDate)
                                                .toISOString()
                                                .split("T")[0]
                                        }
                                    </Box>
                                    <Box mt="2" fontSize="md">
                                        {item.description}
                                    </Box>
                                    <Box mt="2">
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
                                            {item.tag}
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
                                            {item.onlineFormat}
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
