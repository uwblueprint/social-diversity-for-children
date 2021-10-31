import { Center, VStack, Heading, Text, Link } from "@chakra-ui/layout";
import { AgeBadge } from "@components/AgeBadge";
import { SDCButton } from "@components/SDCButton";
import { ClassCardInfo } from "@models/Class";
import colourTheme from "@styles/colours";
import convertToShortTimeRange from "@utils/convertToShortTimeRange";
import React from "react";

export type LiveClassCardProps = {
    cardInfo: ClassCardInfo;
    link: string;
};

export const LiveClassCard: React.FC<LiveClassCardProps> = ({
    cardInfo,
    link,
}) => {
    return (
        <Center
            w="100%"
            h="100%"
            border="1px"
            borderColor={colourTheme.colors.Sliver}
        >
            <VStack mx={9} spacing={6} align="flex-start">
                <AgeBadge
                    isAgeMinimal={cardInfo.isAgeMinimal}
                    borderAge={cardInfo.borderAge}
                    isAdminTheme
                />
                <Heading size="md">
                    {cardInfo.programName} ({cardInfo.name})
                </Heading>
                <Text color={colourTheme.colors.Gray} fontSize="sm">
                    {convertToShortTimeRange(
                        cardInfo.startTimeMinutes,
                        cardInfo.durationMinutes,
                    )}
                    {" with Teacher " + cardInfo.teacherName}
                </Text>
                <Text color={colourTheme.colors.Gray} fontSize="sm">
                    {cardInfo.spaceTaken} participant
                    {cardInfo.spaceTaken > 1 ? "s" : ""} registered
                    <br />
                    {cardInfo.volunteerSpaceTaken} volunteer
                    {cardInfo.volunteerSpaceTaken > 1 ? "s" : ""} registered
                </Text>
                <Link href={link} width="100%" isExternal _hover={{}}>
                    <SDCButton py={4} width="100%">
                        Join Class
                    </SDCButton>
                </Link>
            </VStack>
        </Center>
    );
};