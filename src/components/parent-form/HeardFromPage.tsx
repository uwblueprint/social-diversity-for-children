import React from "react";
import { FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { CheckBoxField } from "@components/formFields/CheckBoxField";

type HeardFromPageProps = {
    styleProps?: Record<string, unknown>;
    props: HeardFromInfo;
};

type HeardFromInfo = {
    heardFromFriendsAndFam: boolean;
    setHeardFromFriendsAndFam: (value: boolean) => void;
    heardFromFlyers: boolean;
    setHeardFromFlyers: (value: boolean) => void;
    heardFromEmail: boolean;
    setHeardFromEmail: (value: boolean) => void;
    heardFromSocialMedia: boolean;
    setHeardFromSocialMedia: (value: boolean) => void;
    heardFromOther: boolean;
    setHeardFromOther: (value: boolean) => void;
    heardFromOptions: boolean;
    setHeardFromOptions: (value: boolean) => void;
};
export const HeardFromPage: React.FC<HeardFromPageProps> = ({ props }): JSX.Element => {
    return (
        <>
            <FormControl id="hear-about-us">
                <FormLabel>How did you hear about our programs?</FormLabel>
                <Stack direction="column">
                    <FormLabel>Does the participant have:</FormLabel>
                    <CheckBoxField
                        value={props.heardFromFriendsAndFam}
                        name={"Friends and Family"}
                        setValue={props.setHeardFromFriendsAndFam}
                        required={false}
                        spacing={false}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={props.heardFromFlyers}
                        name={"Flyers"}
                        setValue={props.setHeardFromFlyers}
                        required={false}
                        spacing={false}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={props.heardFromEmail}
                        name={"Email"}
                        setValue={props.setHeardFromEmail}
                        required={false}
                        spacing={false}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={props.heardFromSocialMedia}
                        name={"Social Media"}
                        setValue={props.setHeardFromSocialMedia}
                        required={false}
                        spacing={false}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={props.heardFromOther}
                        name={"Other"}
                        setValue={props.setHeardFromOther}
                        required={false}
                        spacing={false}
                    ></CheckBoxField>
                </Stack>
            </FormControl>
        </>
    );
};
