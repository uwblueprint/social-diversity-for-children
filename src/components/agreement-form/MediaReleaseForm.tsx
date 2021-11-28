import { Flex, Text, Checkbox, Box, Button } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type MediaReleaseFormProps = {
    styleProps?: Record<string, unknown>;
    onNext: () => void;
};
/**
 * Media release page within the class registration process
 * @returns a page component explaining SDC's media release policy and offering an option to accept it
 */
export const MediaReleaseForm: React.FC<MediaReleaseFormProps> = ({
    onNext,
}): JSX.Element => {
    // Next button is disabled by default, activates when a child is selected
    // Test data to be replaced with children associated with parent during integration
    const { t } = useTranslation("form");

    const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

    return (
        <>
            <Flex justifyContent="space-between"></Flex>
            <Box>
                <Text align="left" mt="35px" fontWeight="700" fontSize="36px">
                    {t("enroll.media")}
                </Text>
            </Box>
            <Box>
                <Text pb="5px" align="left" mt="50px">
                    {t("enroll.media1")}
                </Text>
                <Text pb="5px" align="left" mt="30px">
                    {t("enroll.media2")}
                </Text>
                <Text pb="5px" align="left" mt="30px">
                    {t("enroll.media3")}
                </Text>
            </Box>
            <Box>
                <Text pb="5px" align="left" mt="30px">
                    {t("enroll.media4")}
                </Text>
                <Text pb="5px" align="left" mt="30px">
                    {t("enroll.media5")}
                </Text>
                <Text pb="60px" align="left" mt="30px">
                    {t("enroll.media6")}
                </Text>
            </Box>
            <Box>
                <Checkbox
                    mb="80px"
                    onChange={() => setAcceptedTerms(!acceptedTerms)}
                >
                    {t("form.agreed")}
                </Checkbox>
            </Box>
            <Box pb="50px">
                <Button
                    height="50px"
                    width="200px"
                    borderRadius="6px"
                    background={
                        !acceptedTerms ? "darkgray" : colourTheme.colors.Blue
                    }
                    fontWeight="normal"
                    fontSize="16px"
                    isDisabled={!acceptedTerms}
                    color="white"
                    onClick={onNext}
                >
                    {t("form.next")}
                </Button>
            </Box>
        </>
    );
};
