import Wrapper from "@components/SDCWrapper";
import { BackButton } from "@components/BackButton";
import { Flex, Button, Text, Checkbox, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { CloseButton } from "@components/CloseButton";
import colourTheme from "@styles/colours";

/**
 * Terms and conditions page within the class registration process
 * @returns a page component detailing SDC's terms and conditions and offering an option to accept it
 */
export default function MediaReleaseForm(): JSX.Element {
    // Next button is disabled by default, activates when a child is selected
    // Test data to be replaced with children associated with parent during integration
    const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

    return (
        <Wrapper>
            <Flex justifyContent="space-between">
                <BackButton />
                {/* navigate to browse programs page instead of going back */}
                <CloseButton href="/" />
            </Flex>
            <Box>
                <Text align="left" mt="35px" fontWeight="700" fontSize="36px">
                    Terms {"&"} Conditions
                </Text>
            </Box>
            <Box>
                <Text pb="5px" align="left" mt="30px">
                    All programs will be 8 weeks long (1 session per week) for a
                    total of $130 ($16.25/session). If any financial assistance
                    is required, there are subsidies offered by the government
                    to ensure that children with disabilities have the
                    opportunity to participate in these programs. Please
                    checkout our Financial Support document at
                    sdcprogramming.org for more information.
                </Text>
            </Box>
            <Box>
                <Text pb="5px" align="left" mt="30px">
                    However, if you are not eligible for any government-based
                    disability funding, you are eligible for the SDC Subsidy,
                    which brings the program feed to $80/8 sessions
                    ($10/session). The SDC subsidy is provided by the efforts of
                    our youth team, who fundraise throughout their term.
                </Text>
            </Box>
            <Box>
                <Text pb="5px" align="left" mt="30px">
                    Applicants will be required to fill out all forms on the
                    Registration Form to receive the SDC Subsidy. Please check
                    out our Financial Support document at sdcprogramming.org for
                    more information on the SDC Subsidy and the Low-Income
                    Subsidy offered by SDC. Participants wishing to apply for
                    the low-income subsidy will be asked to pay the SDC
                    subsidized fee first ($80), and then will be refunded by SDC
                    later after the confirmation of eligibility.
                </Text>
            </Box>
            <Box>
                <Text pb="60px" align="left" mt="30px">
                    Upon registering, the payment will be asked for up-front in
                    order to ensure the participants' spot in the program. If
                    after the first session, there are any uncertainties about
                    attending the program, please refer to the SDC Program
                    Refund Policy at sdcprogramming.org
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
                >
                    Next
                </Button>
            </Box>
        </Wrapper>
    );
}
