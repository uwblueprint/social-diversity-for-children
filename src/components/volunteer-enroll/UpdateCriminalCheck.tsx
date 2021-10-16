import {
    OrderedList,
    ListItem,
    Flex,
    Text,
    Checkbox,
    Box,
    Button,
    Link,
} from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import React, { useState } from "react";

type UpdateCriminalCheckFormProps = {
    styleProps?: Record<string, unknown>;
    onNext: () => void;
};
/**
 * Media release page within the class registration process
 * @returns a page component explaining SDC's media release policy and offering an option to accept it
 */
export const UpdateCriminalCheckForm: React.FC<UpdateCriminalCheckFormProps> =
    ({ onNext }): JSX.Element => {
        // Next button is disabled by default, activates criminal checkbox is checked
        const [criminalCheck, setCriminalCheck] = useState<boolean>(false);

        return (
            <>
                <Flex justifyContent="space-between"></Flex>
                <Box>
                    <Text
                        align="left"
                        mt="35px"
                        fontWeight="700"
                        fontSize="36px"
                    >
                        Update Background Check
                    </Text>
                </Box>
                <Box>
                    <Text
                        pb="5px"
                        align="left"
                        fontWeight="700"
                        mt="50px"
                        fontSize="22px"
                    >
                        Your criminal record check has expired!
                    </Text>
                    <Text pb="5px" align="left" mt="30px">
                        As volunteering in our programs involves working closely
                        with children and vulnerable persons, we ask that all
                        our volunteers get a Criminal Record Check completed at
                        their local police station or the RCMP office. The price
                        of the CRC will be waived with a letter provided from
                        SDC.
                    </Text>
                    <Text pb="5px" align="left" mt="30px">
                        Also, please note that the MPM/JELIC is an IN-PERSON
                        math program. If you apply to volunteer for this
                        program, pleasure ensure that you are aware that it is
                        an in-person program and are able to attend the classes
                        at Richmond Quantum Academy (6650-8181 Cambie Rd,
                        Richmond, BC V6X 3X9).
                    </Text>
                </Box>
                <Box>
                    <Text
                        pb="5px"
                        align="left"
                        fontWeight="700"
                        mt="50px"
                        fontSize="22px"
                    >
                        Uploading your Criminal Record Check
                    </Text>
                    <OrderedList pb="5px" align="left" mt="30px">
                        <ListItem>
                            Under My Account {">"} Criminal Record Check
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
                            Once you've submitted your document(s), keep an eye
                            out for the approval status from SDC!
                        </ListItem>
                    </OrderedList>
                </Box>
                <Box>
                    <Link href={"/document-upload"}>
                        <Button
                            mt="40px"
                            width={"288px"}
                            height={"49px"}
                            color={colourTheme.colors.DarkerGray}
                            bg={"#E2E8F0"}
                            px={10}
                            _active={{}}
                            fontWeight={"400"}
                            borderRadius={"6px"}
                        >
                            Upload criminal record check
                        </Button>
                    </Link>
                </Box>
                <Box>
                    <Checkbox
                        mt="75px"
                        onChange={() => setCriminalCheck(!criminalCheck)}
                    >
                        I will provide an updated CRC by the first day of
                        volunteering
                    </Checkbox>
                </Box>

                <Box pb="50px" mt="45px">
                    <Button
                        height="50px"
                        width="200px"
                        borderRadius="6px"
                        background={
                            !criminalCheck
                                ? "darkgray"
                                : colourTheme.colors.Blue
                        }
                        fontWeight="normal"
                        fontSize="16px"
                        isDisabled={!criminalCheck}
                        color="white"
                        onClick={onNext}
                    >
                        Next
                    </Button>
                </Box>
            </>
        );
    };
