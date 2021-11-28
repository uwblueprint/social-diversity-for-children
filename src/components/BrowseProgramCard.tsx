import React from "react";
import { Box, Wrap, WrapItem, Link, Button, HStack, Spacer } from "@chakra-ui/react";
import type { ProgramCardInfo } from "models/Program";
import { useTranslation } from "react-i18next";
import colourTheme from "@styles/colours";
import convertToShortDateRange from "@utils/convertToShortDateRange";
import { locale } from "@prisma/client";
import { useRouter } from "next/router";
import { IoEllipsisVertical } from "react-icons/io5";
import { AdminBadge } from "@components/AdminBadge";

type BrowseProgramCardProps = {
    styleProps?: Record<string, unknown>;
    cardInfo: ProgramCardInfo;
};

export const BrowseProgramCard: React.FC<BrowseProgramCardProps> = ({
    cardInfo,
}): JSX.Element => {
    const { t } = useTranslation("common");
    const router = useRouter();

    return (
        <Wrap spacing="50px" justify="space-between">
            <WrapItem flexBasis="300px" flexGrow={1}>
                <Box
                    borderWidth="1px"
                    width="100%"
                    _hover={{
                        borderColor: colourTheme.colors.Blue,
                        borderWidth: 1,
                    }}
                >
                    <Box minWidth="340px" height="252px" p="35px">
                        <HStack>
                            <Link
                                params={{ cardInfo: cardInfo }}
                                href={`/admin/classes?programId=${cardInfo.id}`}
                            >
                                <Box
                                    mt="1"
                                    fontWeight="600"
                                    fontSize="18px"
                                    width="218px"
                                >
                                    {cardInfo.name}
                                </Box>
                            </Link>
                            <Spacer />
                            <Button padding="2px" borderRadius="full">
                                <IoEllipsisVertical />
                            </Button>
                        </HStack>
                        <Box as="span" color="gray.600" fontSize="sm">
                            {t("time.range", {
                                ...convertToShortDateRange(
                                    cardInfo.startDate,
                                    cardInfo.endDate,
                                    router.locale as locale,
                                ),
                            })}
                        </Box>
                        <Box
                            whiteSpace="pre-wrap"
                            noOfLines={2}
                            overflow="hidden"
                            width="275px"
                            height={9}
                            mt="2"
                            fontSize="12px"
                        >
                            {cardInfo.description}
                        </Box>
                        <Box mt={6}>
                            <AdminBadge>{cardInfo.tag}</AdminBadge>
                            <AdminBadge ml={2}>{cardInfo.onlineFormat}</AdminBadge>
                        </Box>
                    </Box>
                </Box>
            </WrapItem>
        </Wrap>
    );
};
