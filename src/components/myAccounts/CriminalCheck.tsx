import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import Link from "next/link";
import { ApprovedIcon, InfoIcon, PendingIcon } from "@components/icons";
import convertToShortDateString from "@utils/convertToShortDateString";
import { locale } from "@prisma/client";

type CriminalCheckProps = {
    link: string;
    approved: boolean;
    submitDate?: Date;
};

export const CriminalCheck: React.FC<CriminalCheckProps> = ({
    link,
    approved,
    submitDate,
}): JSX.Element => {
    let description;
    let status;
    let icon;

    if (approved) {
        description = "Your criminal record check has been approved.";
        status = "Approved";
        icon = <ApprovedIcon />;
    } else if (link == null) {
        description =
            "You have not uploaded a criminal record check at this time.";
        icon = <InfoIcon />;
    } else {
        description = "Your criminal record check is under review.";
        status = "Pending";
        icon = <PendingIcon />;
    }

    return (
        <Box>
            <Flex alignItems="center">
                <Box pr={8}>{icon}</Box>
                <Box>
                    <Text color={colourTheme.colors.Blue} fontWeight={700}>
                        {description}
                    </Text>
                </Box>
            </Flex>
            <Box pl={120} my={5} color={colourTheme.colors.Gray}>
                {link == null ? null : (
                    <>
                        <Text>Status: {status}</Text>
                        <Text>
                            Date submitted:{" "}
                            {convertToShortDateString(
                                submitDate,
                                locale.en,
                                true,
                            )}
                        </Text>
                    </>
                )}
            </Box>
            <Link href="/document-upload?type=criminal-check&redirect=/myaccounts">
                <Button
                    backgroundColor="#0C53A0"
                    borderColor="brand.400"
                    width="100%"
                    height="54px"
                    fontSize="16px"
                    fontWeight="400"
                    color="white"
                    border="1px"
                    mt="20px"
                >
                    Upload criminal record check
                </Button>
            </Link>
        </Box>
    );
};