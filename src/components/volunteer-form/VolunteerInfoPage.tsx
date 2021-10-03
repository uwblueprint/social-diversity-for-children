import React from "react";
import { HStack, FormLabel, FormControl, Input } from "@chakra-ui/react";

type VolunteerInfoPageProps = {
    styleProps?: Record<string, unknown>;
    props: VolunteerInfo;
};

type VolunteerInfo = {
    volunteerFirstName: any;
    setVolunteerFirstName: any;
    volunteerLastName: any;
    setVolunteerLastName: any;
    phoneNumber: any;
    setPhoneNumber: any;
};
export const VolunteerInfoPage: React.FC<VolunteerInfoPageProps> = ({
    props,
}): JSX.Element => {
    return (
        <>
            <FormLabel>
                Volunteer Name
                <HStack spacing="24px">
                    <FormControl id="first-name">
                        <Input
                            placeholder="First name"
                            onChange={(e) =>
                                props.setVolunteerFirstName(e.target.value)
                            }
                            value={props.volunteerFirstName}
                        />
                    </FormControl>
                    <FormControl id="last-name">
                        <Input
                            placeholder="Last name"
                            onChange={(e) =>
                                props.setVolunteerLastName(e.target.value)
                            }
                            value={props.volunteerLastName}
                        />
                    </FormControl>
                </HStack>
            </FormLabel>
            <FormControl id="Phone Number">
                <FormLabel>Phone Number </FormLabel>
                <Input
                    placeholder="289 349 1048"
                    onChange={(e) => props.setPhoneNumber(e.target.value)}
                    value={props.phoneNumber}
                />
            </FormControl>
        </>
    );
};
