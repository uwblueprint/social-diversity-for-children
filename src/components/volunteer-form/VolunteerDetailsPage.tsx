import React from "react";
import {
    HStack,
    FormLabel,
    FormControl,
    Input,
    Stack,
    Checkbox,
    Select,
} from "@chakra-ui/react";
import { province } from "@models/User";
type VolunteerDetailsPageProps = {
    styleProps?: Record<string, unknown>;
    props: VolunteerDetailsInfo;
};

type VolunteerDetailsInfo = {
    dateOfBirth: any;
    setDateOfBirth: any;
    address1: any;
    setAddress1: any;
    city: any;
    setCity: any;
    participantProvince: any;
    setParticipantProvince: any;
    postalCode: any;
    setPostalCode: any;
    school: any;
    setSchool: any;
};

export const VolunteerDetailsPage: React.FC<VolunteerDetailsPageProps> = ({
    props,
}): JSX.Element => {
    return (
        <>
            <FormControl id="date-of-birth">
                <FormLabel>Date Of Birth (YYYY-MM-DD) </FormLabel>
                <Input
                    placeholder="Date Of Birth"
                    onChange={(e) => props.setDateOfBirth(e.target.value)}
                    value={props.dateOfBirth}
                />
            </FormControl>
            <FormControl id="fifteen" isRequired>
                {/* TODO: make mandatory before proceeding with rest of form */}
                <Stack direction="column">
                    <Checkbox>
                        I certify that I am over the age of 15 in order to
                        volunteer with SDC
                    </Checkbox>
                </Stack>
            </FormControl>
            <FormControl id="street-address">
                <FormLabel>Street Address </FormLabel>
                <Input
                    placeholder="815 Hornby St."
                    onChange={(e) => props.setAddress1(e.target.value)}
                    value={props.address1}
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
                        placeholder="Select option"
                        onChange={(e) =>
                            props.setParticipantProvince(
                                province[e.target.value],
                            )
                        }
                        value={props.participantProvince} // TODO: bug with displayed value after refresh
                    >
                        <option value="NL">NL</option>
                        <option value="PE">PE</option>
                        <option value="NS">NS</option>
                        <option value="NB">NB</option>
                        <option value="QC">QC</option>
                        <option value="ON">ON</option>
                        <option value="MB">MB</option>
                        <option value="SK">SK</option>
                        <option value="AB">AB</option>
                        <option value="BC">BC</option>
                        <option value="YT">YT</option>
                        <option value="NT">NT</option>
                        <option value="NU">NU</option>
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
        </>
    );
};
