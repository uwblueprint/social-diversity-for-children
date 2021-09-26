import React from "react";
import {
    Box,
    Text,
    FormLabel,
    FormControl,
    Input,
    HStack,
    Select,
} from "@chakra-ui/react";

import { province } from "@models/User";
// pass in props then do props.participant Name, etc...
type ParticipantPageProps = {
    styleProps?: Record<string, unknown>;
    props: ParticipantInfo;
};

type ParticipantInfo = {
    participantFirstName: any;
    setParticipantFirstName: any;
    participantLastName: any;
    setParticipantLastName: any;
    dateOfBirth: any;
    setDateOfBirth: any;
    address1: any;
    setAddress1: any;
    address2: any;
    setAddress2: any;
    city: any;
    setCity: any;
    participantProvince: any;
    setParticipantProvince: any;
    postalCode: any;
    setPostalCode: any;
    school: any;
    setSchool: any;
    grade: any;
    setGrade: any;
};
export const ParticipantInfoPage: React.FC<ParticipantPageProps> = ({
    props,
}): JSX.Element => {
    return (
        <>
            <Box maxW="55rem">
                <Text noOfLines={2} fontSize="16px" fontWeight="200">
                    Please provide information on the participant that is being
                    registered in the program. An opportunity to add information
                    of additional participants you would like to register will
                    be provided afterwards.
                </Text>
            </Box>
            <FormLabel>
                Participant Name
                <HStack spacing="24px">
                    <FormControl id="participant-first-name">
                        <Input
                            placeholder="First name"
                            onChange={(e) =>
                                props.setParticipantFirstName(e.target.value)
                            }
                            value={props.participantFirstName}
                        />
                    </FormControl>
                    <FormControl id="participant-last-name">
                        <Input
                            placeholder="Last name"
                            onChange={(e) =>
                                props.setParticipantLastName(e.target.value)
                            }
                            value={props.participantLastName}
                        />
                    </FormControl>
                </HStack>
            </FormLabel>
            <FormControl id="date-of-birth">
                <FormLabel>Date Of Birth (YYYY-MM-DD) </FormLabel>
                <Input
                    placeholder="Date Of Birth"
                    onChange={(e) => props.setDateOfBirth(e.target.value)}
                    value={props.dateOfBirth}
                />
            </FormControl>
            <FormControl id="street-address-1">
                <FormLabel>Street Address 1</FormLabel>
                <Input
                    placeholder="815 Hornby St."
                    onChange={(e) => props.setAddress1(e.target.value)}
                    value={props.address1}
                />
            </FormControl>
            <FormControl id="street-address-2">
                <FormLabel>Street Address 2</FormLabel>
                <Input
                    placeholder="Suite 203"
                    onChange={(e) => props.setAddress2(e.target.value)}
                    value={props.address2}
                />
            </FormControl>
            <HStack spacing="24px">
                <FormControl id="city">
                    <FormLabel>City</FormLabel>
                    <Input
                        placeholder="Vancouver"
                        onChange={(e) => props.setCity(e.target.value)}
                        value={props.city}
                    />
                </FormControl>
                <FormControl id="province">
                    <FormLabel>Province</FormLabel>
                    <Select
                        placeholder={"Select option"}
                        onChange={(e) =>
                            props.setParticipantProvince(
                                province[e.target.value],
                            )
                        }
                        value={props.participantProvince} // TODO: bug with displayed value after refresh
                    >
                        {Object.entries(province)
                            .sort()
                            .map((prov) => {
                                const [key, val] = prov;
                                return (
                                    <option key={key} value={val}>
                                        {val}
                                    </option>
                                );
                            })}
                    </Select>
                </FormControl>
                <FormControl id="postal-code">
                    <FormLabel>Postal Code</FormLabel>
                    <Input
                        placeholder="V6Z 2E6"
                        onChange={(e) => props.setPostalCode(e.target.value)}
                        value={props.postalCode}
                    />
                </FormControl>
            </HStack>
            <FormControl id="school">
                <FormLabel>School (if applicable)</FormLabel>
                <Input
                    placeholder="Westmount Secondary School"
                    onChange={(e) => props.setSchool(e.target.value)}
                    value={props.school}
                />
            </FormControl>
            <FormControl id="grade">
                <FormLabel>Grade (if applicable)</FormLabel>
                <Input
                    placeholder="5"
                    onChange={(e) => props.setGrade(e.target.value)}
                    value={props.grade}
                />
            </FormControl>
        </>
    );
};
