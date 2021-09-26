import React from "react";
import { FormControl, FormLabel, Stack, Checkbox } from "@chakra-ui/react";
import { heardFrom } from "@models/User";
type HeardFromPageProps = {
    styleProps?: Record<string, unknown>;
    props: HeardFromInfo;
};

type HeardFromInfo = {
    heardFromFriendsAndFam: any;
    setHeardFromFriendsAndFam: any;
    heardFromFlyers: any;
    setHeardFromFlyers: any;
    heardFromEmail: any;
    setHeardFromEmail: any;
    heardFromSocialMedia: any;
    setHeardFromSocialMedia: any;
    heardFromOther: any;
    setHeardFromOther: any;
    heardFromOptions: any;
    setHeardFromOptions: any;
};
export const HeardFromPage: React.FC<HeardFromPageProps> = ({
    props,
}): JSX.Element => {
    return (
        <>
            <FormControl id="hear-about-us">
                <FormLabel>How did you hear about our programs?</FormLabel>
                <Stack direction="column">
                    <Checkbox
                        isChecked={props.heardFromFriendsAndFam}
                        onChange={(e) => {
                            props.setHeardFromFriendsAndFam(e.target.checked);
                            if (e.target.checked) {
                                props.heardFromOptions.push(
                                    heardFrom.FRIENDS_FAMILY,
                                );
                                props.setHeardFromOptions(
                                    props.heardFromOptions,
                                );
                            } else {
                                const newHeardFromOptions =
                                    props.heardFromOptions.filter(
                                        (hf) => hf != heardFrom.FRIENDS_FAMILY,
                                    );
                                props.setHeardFromOptions(newHeardFromOptions);
                            }
                        }}
                    >
                        Friends and Family
                    </Checkbox>
                    <Checkbox
                        isChecked={props.heardFromFlyers}
                        onChange={(e) => {
                            props.setHeardFromFlyers(e.target.checked);
                            if (e.target.checked) {
                                props.heardFromOptions.push(heardFrom.FLYERS);
                                props.setHeardFromOptions(
                                    props.heardFromOptions,
                                );
                            } else {
                                const newHeardFromOptions =
                                    props.heardFromOptions.filter(
                                        (hf) => hf != heardFrom.FLYERS,
                                    );
                                props.setHeardFromOptions(newHeardFromOptions);
                            }
                        }}
                    >
                        Flyers
                    </Checkbox>
                    <Checkbox
                        isChecked={props.heardFromEmail}
                        onChange={(e) => {
                            props.setHeardFromEmail(e.target.checked);
                            if (e.target.checked) {
                                props.heardFromOptions.push(heardFrom.EMAIL);
                                props.setHeardFromOptions(
                                    props.heardFromOptions,
                                );
                            } else {
                                const newHeardFromOptions =
                                    props.heardFromOptions.filter(
                                        (hf) => hf != heardFrom.EMAIL,
                                    );
                                props.setHeardFromOptions(newHeardFromOptions);
                            }
                        }}
                    >
                        Email
                    </Checkbox>
                    <Checkbox
                        isChecked={props.heardFromSocialMedia}
                        onChange={(e) => {
                            props.setHeardFromSocialMedia(e.target.checked);
                            if (e.target.checked) {
                                props.heardFromOptions.push(
                                    heardFrom.SOCIAL_MEDIA,
                                );
                                props.setHeardFromOptions(
                                    props.heardFromOptions,
                                );
                            } else {
                                const newHeardFromOptions =
                                    props.heardFromOptions.filter(
                                        (hf) => hf != heardFrom.SOCIAL_MEDIA,
                                    );
                                props.setHeardFromOptions(newHeardFromOptions);
                            }
                        }}
                    >
                        Social Media
                    </Checkbox>
                    <Checkbox
                        isChecked={props.heardFromOther}
                        onChange={(e) => {
                            props.setHeardFromOther(e.target.checked);
                            if (e.target.checked) {
                                props.heardFromOptions.push(heardFrom.OTHER);
                                props.setHeardFromOptions(
                                    props.heardFromOptions,
                                );
                            } else {
                                const newHeardFromOptions =
                                    props.heardFromOptions.filter(
                                        (hf) => hf != heardFrom.OTHER,
                                    );
                                props.setHeardFromOptions(newHeardFromOptions);
                            }
                        }}
                    >
                        Other
                    </Checkbox>
                </Stack>
            </FormControl>
        </>
    );
};
