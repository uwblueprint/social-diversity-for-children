import React from "react";
import { Box, Center, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { WaitlistCardInfo } from "@models/Enroll";
import { WaitlistCard } from "./WaitlistCard";
import colourTheme from "@styles/colours";
import useParentWaitlist from "@utils/useParentWaitlist";
import { locale } from "@prisma/client";
import { Loading } from "./Loading";
import { useRouter } from "next/router";
import { EmptyState } from "./EmptyState";
import { useTranslation } from "react-i18next";

type WaitlistCardsProps = {
    waitlistInfo: WaitlistCardInfo[];
};

const WaitlistCards: React.FC<WaitlistCardsProps> = ({ waitlistInfo }) => {
    return (
        <Center width="100%">
            {waitlistInfo.length === 0 ? (
                <EmptyState>
                    Currently you are not waitlisted in any classes. <br />
                    Any classes you waitlist for will show up here!
                </EmptyState>
            ) : (
                <List spacing="5" width="100%">
                    {waitlistInfo.map((item) => {
                        return (
                            <ListItem
                                borderColor="gray.200"
                                _hover={{
                                    borderColor: colourTheme.colors.Blue,
                                }}
                                borderWidth={2}
                                key={item.classId}
                            >
                                <WaitlistCard waitlistInfo={item} />
                            </ListItem>
                        );
                    })}
                </List>
            )}
        </Center>
    );
};

/**
 * WaitlistList is a list containing waitlist cards
 * @param waitlistInfo info of waitlist card
 * @returns a component that displays a list of waitlist card info with tabs
 */
export const WaitlistList: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation("common");
    const { waitlist, error, isLoading } = useParentWaitlist(
        router.locale as locale,
    );

    if (error) {
        return (
            // This should really route to some error page instead
            <Text>An error has occurred. {error.toString()}</Text>
        );
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Box>
            <Heading mb={2} size="sm">
                {t("class.waitlistedClasses")}
            </Heading>
            <Text color="gray.600" fontSize="sm">
                {t("class.waitlistedInfo")}
            </Text>
            <WaitlistCards waitlistInfo={waitlist} />
        </Box>
    );
};
