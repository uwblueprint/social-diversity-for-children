import { Text, Checkbox, Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import colourTheme from "@styles/colours";
import { useTranslation } from "next-i18next";

type ParticipantWaiverProps = {
    styleProps?: Record<string, unknown>;
    onNext: () => void;
};

/**
 * Participant waiver page within the class registration process
 * @returns a page component providing SDC's participant waiver and offering an option to accept it
 */
export const ParticipantWaiver: React.FC<ParticipantWaiverProps> = ({
    onNext,
}): JSX.Element => {
    const { t } = useTranslation("form");

    // Next button is disabled by default, activates when a child is selected
    // Test data to be replaced with children associated with parent during integration
    const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

    return (
        <>
            <Box>
                <Text align="left" mt="35px" fontWeight="700" fontSize="36px">
                    {t("enroll.waiver")}
                </Text>
            </Box>
            <Box>
                <Text pb="60px" align="left" mt="30px">
                    {t("enroll.waiver1")}
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
