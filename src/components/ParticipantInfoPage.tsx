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

type ParticipantInfoPageProps = {
    styleProps?: Record<string, unknown>;
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

export const ParticipantInfoPage: React.FC<ParticipantInfoPageProps> = ({
    participantFirstName,
    setParticipantFirstName,
    participantLastName,
    setParticipantLastName,
    dateOfBirth,
    setDateOfBirth,
    address1,
    setAddress1,
    address2,
    setAddress2,
    city,
    setCity,
    participantProvince,
    setParticipantProvince,
    postalCode,
    setPostalCode,
    school,
    setSchool,
    grade,
    setGrade,
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
                                setParticipantFirstName(e.target.value)
                            }
                            value={participantFirstName}
                        />
                    </FormControl>
                    <FormControl id="participant-last-name">
                        <Input
                            placeholder="Last name"
                            onChange={(e) =>
                                setParticipantLastName(e.target.value)
                            }
                            value={participantLastName}
                        />
                    </FormControl>
                </HStack>
            </FormLabel>
            <FormControl id="date-of-birth">
                <FormLabel>Date Of Birth (YYYY-MM-DD) </FormLabel>
                <Input
                    placeholder="Date Of Birth"
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    value={dateOfBirth}
                />
            </FormControl>
            <FormControl id="street-address-1">
                <FormLabel>Street Address 1</FormLabel>
                <Input
                    placeholder="815 Hornby St."
                    onChange={(e) => setAddress1(e.target.value)}
                    value={address1}
                />
            </FormControl>
            <FormControl id="street-address-2">
                <FormLabel>Street Address 2</FormLabel>
                <Input
                    placeholder="Suite 203"
                    onChange={(e) => setAddress2(e.target.value)}
                    value={address2}
                />
            </FormControl>
            <HStack spacing="24px">
                <FormControl id="city">
                    <FormLabel>City</FormLabel>
                    <Input
                        placeholder="Vancouver"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                    />
                </FormControl>
                <FormControl id="province">
                    <FormLabel>Province</FormLabel>
                    <Select
                        placeholder={"Select option"}
                        onChange={(e) =>
                            setParticipantProvince(province[e.target.value])
                        }
                        value={participantProvince} // TODO: bug with displayed value after refresh
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
                        onChange={(e) => setPostalCode(e.target.value)}
                        value={postalCode}
                    />
                </FormControl>
            </HStack>
            <FormControl id="school">
                <FormLabel>School (if applicable)</FormLabel>
                <Input
                    placeholder="Westmount Secondary School"
                    onChange={(e) => setSchool(e.target.value)}
                    value={school}
                />
            </FormControl>
            <FormControl id="grade">
                <FormLabel>Grade (if applicable)</FormLabel>
                <Input
                    placeholder="5"
                    onChange={(e) => setGrade(e.target.value)}
                    value={grade}
                />
            </FormControl>
        </>
    );
};
