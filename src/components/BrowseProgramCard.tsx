import React from "react";
import {
    Box,
    Wrap,
    WrapItem,
    Center,
    AspectRatio,
    Image,
    Link,
    Button,
} from "@chakra-ui/react";
import type { ProgramCardInfo } from "models/Program";
import { SDCBadge } from "./SDCBadge";
import { useTranslation } from "react-i18next";
import colourTheme from "@styles/colours";
import convertToShortDateRange from "@utils/convertToShortDateRange";
import { locale, programFormat } from "@prisma/client";
import { useRouter } from "next/router";
import { IoEllipsisVertical } from "react-icons/io5";

type BrowseProgramCardProps = {
    styleProps?: Record<string, unknown>;
    cardInfo: ProgramCardInfo;
    session: Record<string, unknown>;
};

export const BrowseProgramCard: React.FC<BrowseProgramCardProps> = ({
    cardInfo,
}): JSX.Element => {
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <Wrap spacing="50px" justify="space-between">
            <WrapItem flexBasis="300px" flexGrow={1} cursor={"pointer"}>
                <Link href={`program-details/${cardInfo.id}`}>
                    <Box
                        borderWidth="1px"
                        width="100%"
                        _hover={{
                            borderColor: colourTheme.colors.Blue,
                            borderWidth: 1,
                        }}
                    >
                        <Box width="340px" height="252px" p="35px">
                            <Box
                                mt="1"
                                fontWeight="600"
                                fontSize="18px"
                                width="218px"
                            >
                                {cardInfo.name}
                            </Box>

                            <Box as="span" color="gray.600" fontSize="sm">
                                {t("time.range", {
                                    ...convertToShortDateRange(
                                        cardInfo.startDate,
                                        cardInfo.endDate,
                                        router.locale as locale,
                                    ),
                                })}
                            </Box>
                            <Box mt="2" fontSize="md">
                                {cardInfo.description}
                            </Box>
                            <Box mt="2">
                                <SDCBadge children={cardInfo.tag} />
                                <SDCBadge
                                    ml="2"
                                    children={cardInfo.onlineFormat}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Link>
            </WrapItem>
        </Wrap>
    );
};
