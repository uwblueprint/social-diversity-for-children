import React from "react";
import { HStack, FormLabel, FormControl, Input } from "@chakra-ui/react";

type EmergPageProps = {
    styleProps?: Record<string, unknown>;
    props: EmergInfo;
};

type EmergInfo = {
    parentFirstName: any;
    setParentFirstName: any;
    parentLastName: any;
    setParentLastName: any;
    parentPhoneNumber: any;
    setParentPhoneNumber: any;
    parentRelationship: any;
    setParentRelationship: any;
};
export const EmergInfoPage: React.FC<EmergPageProps> = ({
    props,
}): JSX.Element => {
    return (
        <>
            <FormLabel>
                Parent/Guardian Name
                <HStack spacing="24px">
                    <FormControl id="parent-first-name">
                        <Input
                            placeholder="First name"
                            onChange={(e) =>
                                props.setParentFirstName(e.target.value)
                            }
                            value={props.parentFirstName}
                        />
                    </FormControl>
                    <FormControl id="parent-last-name">
                        <Input
                            placeholder="Last name"
                            onChange={(e) =>
                                props.setParentLastName(e.target.value)
                            }
                            value={props.parentLastName}
                        />
                    </FormControl>
                </HStack>
            </FormLabel>
            <FormControl id="phone-number">
                <FormLabel>Phone Number </FormLabel>
                <Input
                    placeholder="289 349 1048"
                    onChange={(e) => props.setParentPhoneNumber(e.target.value)}
                    value={props.parentPhoneNumber}
                />
            </FormControl>
            <FormControl id="parent-relationship-to-participant">
                <FormLabel>Relationship to Participant</FormLabel>
                <Input
                    placeholder="Mother"
                    onChange={(e) =>
                        props.setParentRelationship(e.target.value)
                    }
                    value={props.parentRelationship}
                />
            </FormControl>
        </>
    );
};
