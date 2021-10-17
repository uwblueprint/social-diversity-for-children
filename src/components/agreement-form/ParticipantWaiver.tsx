import { Text, Checkbox, Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import colourTheme from "@styles/colours";

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
    // Next button is disabled by default, activates when a child is selected
    // Test data to be replaced with children associated with parent during integration
    const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

    return (
        <>
            <Box>
                <Text align="left" mt="35px" fontWeight="700" fontSize="36px">
                    Participant Waiver
                </Text>
            </Box>
            <Box>
                <Text pb="60px" align="left" mt="30px">
                    I hereby give my full approval and permission for my
                    son/daughter to attend the Social Diversity for Children
                    Foundation's programs. I am aware that my child is expected
                    to respect both the emotional safety and physical safety of
                    other participants. Parents/Guardians will be informed if
                    their child's behaviour does not reflect this standard. Any
                    child who puts the safety of other participants at risk may
                    be asked to withdraw from the activity. I agree to hold all
                    Social Diversity for Children staff, contractors, and
                    volunteers, and the activity in-charge, and any parties
                    hosting this event, including officers and directors, from
                    any liability resulting from the participation of the named
                    participant in the registered activity.
                </Text>
            </Box>
            <Box>
                <Checkbox
                    mb="80px"
                    onChange={() => setAcceptedTerms(!acceptedTerms)}
                >
                    I have read and agree to the terms above
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
                    Next
                </Button>
            </Box>
        </>
    );
};
