import React from "react";
import { HStack, FormLabel, FormControl, Input } from "@chakra-ui/react";

type EmergInfoPageProps = {
    styleProps?: Record<string, unknown>;
    parentFirstName: any;
    setParentFirstName: any;
    parentLastName: any;
    setParentLastName: any;
    parentPhoneNumber: any;
    setParentPhoneNumber: any;
    parentRelationship: any;
    setParentRelationship: any;
};

export const EmergInfoPage: React.FC<EmergInfoPageProps> = ({
    parentFirstName,
    setParentFirstName,
    parentLastName,
    setParentLastName,
    parentPhoneNumber,
    setParentPhoneNumber,
    parentRelationship,
    setParentRelationship,
}): JSX.Element => {
    return (
        <>
            <FormLabel>
                Parent/Guardian Name
                <HStack spacing="24px">
                    <FormControl id="parent-first-name">
                        <Input
                            placeholder="First name"
                            onChange={(e) => setParentFirstName(e.target.value)}
                            value={parentFirstName}
                        />
                    </FormControl>
                    <FormControl id="parent-last-name">
                        <Input
                            placeholder="Last name"
                            onChange={(e) => setParentLastName(e.target.value)}
                            value={parentLastName}
                        />
                    </FormControl>
                </HStack>
            </FormLabel>
            <FormControl id="phone-number">
                <FormLabel>Phone Number </FormLabel>
                <Input
                    placeholder="289 349 1048"
                    onChange={(e) => setParentPhoneNumber(e.target.value)}
                    value={parentPhoneNumber}
                />
            </FormControl>
            <FormControl id="parent-relationship-to-participant">
                <FormLabel>Relationship to Participant</FormLabel>
                <Input
                    placeholder="Mother"
                    onChange={(e) => setParentRelationship(e.target.value)}
                    value={parentRelationship}
                />
            </FormControl>
        </>
    );
};
