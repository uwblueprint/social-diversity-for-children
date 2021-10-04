import React from "react";
import {
    HStack,
    FormLabel,
    FormControl,
    Input,
    FormErrorMessage,
    Button,
} from "@chakra-ui/react";
import { testPhoneNumber } from "@utils/validation/fields";
import colourTheme from "@styles/colours";

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
    formButtonOnClick: any;
};
export const VolunteerInfoPage: React.FC<VolunteerInfoPageProps> = ({
    props,
}): JSX.Element => {
    return (
        <>
            <FormLabel>
                Volunteer Name
                <HStack spacing="24px">
                    <FormControl id="first-name" isRequired>
                        <Input
                            placeholder="First name"
                            onChange={(e) =>
                                props.setVolunteerFirstName(e.target.value)
                            }
                            value={props.volunteerFirstName}
                        />
                    </FormControl>
                    <FormControl id="last-name" isRequired>
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
            <FormControl
                id="phone-number"
                isRequired
                isInvalid={!testPhoneNumber(props.phoneNumber)}
            >
                <FormLabel>Phone Number </FormLabel>
                <Input
                    placeholder="289 349 1048"
                    onChange={(e) => props.setPhoneNumber(e.target.value)}
                    value={props.phoneNumber}
                />
                <FormErrorMessage>
                    {props.phoneNumber ? "Invalid Phone Number" : "Required"}
                </FormErrorMessage>
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
                    disabled={!testPhoneNumber(props.phoneNumber)}
                    onClick={props.formButtonOnClick}
                >
                    Next
                </Button>
            </div>
        </>
    );
};
