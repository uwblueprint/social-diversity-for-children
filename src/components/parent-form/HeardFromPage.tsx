import React from "react";
import { FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { CheckBoxField } from "@components/formFields/CheckBoxField";
import { useTranslation } from "next-i18next";

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
    const { t } = useTranslation(["form", "common"]);

    return (
        <>
            <FormControl id="hear-about-us">
                <FormLabel>{t("signUp.hearAboutUs")}</FormLabel>
                <Stack direction="column">
                    <FormLabel>{t("signUp.participantHaveDifficulties")}</FormLabel>
                    <CheckBoxField
                        value={props.heardFromFriendsAndFam}
                        name={t("hearAboutUs.friendsAndFamily", {
                            ns: "common",
                        })}
                        setValue={props.setHeardFromFriendsAndFam}
                        required={false}
                        spacing={false}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={props.heardFromFlyers}
                        name={t("hearAboutUs.flyers", {
                            ns: "common",
                        })}
                        setValue={props.setHeardFromFlyers}
                        required={false}
                        spacing={false}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={props.heardFromEmail}
                        name={t("hearAboutUs.email", {
                            ns: "common",
                        })}
                        setValue={props.setHeardFromEmail}
                        required={false}
                        spacing={false}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={props.heardFromSocialMedia}
                        name={t("hearAboutUs.social", {
                            ns: "common",
                        })}
                        setValue={props.setHeardFromSocialMedia}
                        required={false}
                        spacing={false}
                    ></CheckBoxField>
                    <CheckBoxField
                        value={props.heardFromOther}
                        name={t("hearAboutUs.other", {
                            ns: "common",
                        })}
                        setValue={props.setHeardFromOther}
                        required={false}
                        spacing={false}
                    ></CheckBoxField>
                </Stack>
            </FormControl>
        </>
    );
};
