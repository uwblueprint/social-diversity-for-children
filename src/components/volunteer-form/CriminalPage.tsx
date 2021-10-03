import React from "react";
import { Box, Text, Heading, OrderedList, ListItem } from "@chakra-ui/react";

type CriminalPageProps = {
    styleProps?: Record<string, unknown>;
};

export const CriminalPage: React.FC<CriminalPageProps> = (): JSX.Element => {
    return (
        <>
            <Box maxW="55rem">
                <Text margin="10px" fontSize="16px" fontWeight="200">
                    As volunteering in our programs involves working closely
                    with children and vulnerable persons, we ask that all our
                    volunteers get a Criminal Record Check completed at their
                    local police station or the RCMP office. The price of the
                    CRC will be waived with a letter provided from SDC.
                </Text>
                <Text margin="10px" fontSize="16px" fontWeight="200">
                    Also, please note that the MPM/JELIC is an IN-PERSON math
                    program. If you apply to volunteer for this program, please
                    ensure that you are aware that it is an in-person program
                    and are able to attend the classes at Richmond Quantum
                    Academy (6650-8181 Cambie Rd, Richmond, BC V6X 3X9).
                </Text>
                <Heading fontSize="22px">
                    Uploading your Criminal Record Check
                    <OrderedList margin="10px" fontSize="16px" fontWeight="400">
                        <ListItem>
                            Under My Account, then Criminal Record Check
                            generates a volunteer letter from SDC
                        </ListItem>
                        <ListItem>
                            Use the provided letter to obtain a criminal record
                            check at the local police station or RCMP office
                        </ListItem>
                        <ListItem>
                            Upload a copy of the document to your SDC account
                        </ListItem>
                        <ListItem>
                            Once you’ve submitted your document(s), keep an eye
                            out for the approval status from SDC!
                        </ListItem>
                    </OrderedList>
                </Heading>
            </Box>
        </>
    );
};
