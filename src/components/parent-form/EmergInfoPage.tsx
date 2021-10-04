import React from "react";
import {
    HStack,
    FormLabel,
    FormControl,
    Input,
    FormErrorMessage,
    Button,
} from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import { testPhoneNumber } from "@utils/validation/fields";

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
    formButtonOnClick: any;
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
            <FormControl
                id="phone-number"
                isRequired
                isInvalid={!testPhoneNumber(props.parentPhoneNumber)}
            >
                <FormLabel>Phone Number </FormLabel>
                <Input
                    placeholder="289 349 1048"
                    onChange={(e) => props.setParentPhoneNumber(e.target.value)}
                    value={props.parentPhoneNumber}
                />
                <FormErrorMessage>
                    {props.parentPhoneNumber
                        ? "Invalid Phone Number"
                        : "Required"}
                </FormErrorMessage>
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
            <div>
                <Button
                    id="Submit"
                    bg={colourTheme.colors.Blue}
                    color={"white"}
                    fontWeight="400"
                    my={8}
                    px={12}
                    borderRadius={100}
                    mt={4}
                    disabled={!testPhoneNumber(props.parentPhoneNumber)}
                    onClick={props.formButtonOnClick}
                >
                    Next
                </Button>
            </div>
        </>
    );
};
