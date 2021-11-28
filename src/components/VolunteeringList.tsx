import React from "react";
import { Center, Heading, List, ListItem, Text } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import { VolunteeringCard } from "./VolunteeringCard";
import useVolunteerRegistrations from "@utils/hooks/useVolunteerRegistration";
import { Loading } from "./Loading";
import { useRouter } from "next/router";
import { locale } from "@prisma/client";
import { EmptyState } from "./EmptyState";

/**
 * VolunteeringList is a list containing volunteering cards
 * @returns a component that displays a list of volunteering card info
 */
export const VolunteeringList: React.FC = () => {
    const router = useRouter();
    const { volunteering, error, isLoading } = useVolunteerRegistrations(router.locale as locale);

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
        <>
            <Heading mb={2} size="sm">
                Upcoming classes
            </Heading>
            <Center width="100%">
                {volunteering.length === 0 ? (
                    <EmptyState>
                        Currently you have not registered in any classes. <br />
                        Any classes you registered for will show up here!
                    </EmptyState>
                ) : (
                    <List spacing="5" width="100%">
                        {volunteering.map((item) => {
                            return (
                                <ListItem
                                    borderColor="gray.200"
                                    _hover={{
                                        borderColor: colourTheme.colors.Blue,
                                    }}
                                    borderWidth={2}
                                    key={item.classId}
                                >
                                    <VolunteeringCard volunteeringInfo={item} />
                                </ListItem>
                            );
                        })}
                    </List>
                )}
            </Center>
        </>
    );
};
