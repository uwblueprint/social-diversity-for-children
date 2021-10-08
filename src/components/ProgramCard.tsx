import React from "react";
import {
    Box,
    Wrap,
    WrapItem,
    Center,
    AspectRatio,
    Image,
} from "@chakra-ui/react";
import type { ProgramCardInfo } from "models/Program";
import { programFormat } from "@prisma/client";
import { SDCBadge } from "./SDCBadge";
import convertToShortDateRange from "@utils/convertToShortDateRange";
import colourTheme from "@styles/colours";
import Link from "next/link";

type ProgramCardProps = {
    styleProps?: Record<string, unknown>;
    cardInfo: ProgramCardInfo[];
    session: Record<string, unknown>;
};

/**
 *
 * @param cardInfo info for the program cards on the home page
 * @returns a component with all the cards for each of the programs in the database
 */
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
                        <WrapItem
                            flexBasis="300px"
                            key={idx}
                            flexGrow={1}
                            cursor={"pointer"}
                        >
                            <Link href={`program-details/${item.id}`}>
                                <Box
                                    borderWidth="1px"
                                    width="100%"
                                    _hover={{
                                        borderColor: colourTheme.colors.Blue,
                                        borderWidth: 1,
                                    }}
                                >
                                    <AspectRatio width="100%" ratio={4 / 3}>
                                        <Image
                                            src={item.image}
                                            boxSize="200"
                                            key={idx}
                                            data-index={idx}
                                            fit="cover"
                                            width={20}
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
                                            {convertToShortDateRange(
                                                item.startDate,
                                                item.endDate,
                                            )}
                                        </Box>
                                        <Box mt="2" fontSize="md">
                                            {item.description}
                                        </Box>
                                        <Box mt="2">
                                            <SDCBadge children={item.tag} />
                                            <SDCBadge
                                                ml="2"
                                                children={item.onlineFormat}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Link>
                        </WrapItem>
                    );
                })}
            </Wrap>
        </Center>
    );
};
