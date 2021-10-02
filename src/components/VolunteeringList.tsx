import React from "react";
import { Center, Heading, List, ListItem, Text } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import { VolunteeringCard } from "./VolunteeringCard";
import useVolunteerRegistrations from "@utils/useVolunteerRegistration";
import { Loading } from "./Loading";

/**
 * VolunteeringList is a list containing volunteering cards
 * @returns a component that displays a list of volunteering card info
 */
export const VolunteeringList: React.FC = () => {
    const { volunteering, error, isLoading } = useVolunteerRegistrations();

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
            </Center>
        </>
    );
};
