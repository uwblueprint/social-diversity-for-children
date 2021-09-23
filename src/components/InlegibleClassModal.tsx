import React from "react";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Text,
} from "@chakra-ui/react";

type InlegibleClassModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

/**
 * Modal for class registration
 * @param isOpen a boolean from the useDisclosure hook
 * @param onClose a method from the useDisclosure hook
 * @param classInfo info about the class
 * @param onlineFormat whether program is online
 * @param tag category of program
 * @returns a modal component allowing user to register in class
 */
export const InlegibleClassModal: React.FC<InlegibleClassModalProps> = ({
    isOpen,
    onClose,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent p={5}>
                <ModalBody>
                    <Text>
                        Your child is not eligible for this age group. Please
                        select a different class.
                    </Text>
                </ModalBody>

                <ModalFooter>
                    <Button
                        bg={"#0C53A0"}
                        color={"white"}
                        mx={"auto"}
                        my={2}
                        onClick={onClose}
                        fontWeight={"200"}
                        _hover={{
                            textDecoration: "none",
                            bg: "#2C6AAD",
                        }}
                        _active={{
                            bg: "lightgrey",
                            outlineColor: "grey",
                            border: "grey",
                            boxShadow: "lightgrey",
                        }}
                        _focus={{
                            outlineColor: "grey",
                            border: "grey",
                            boxShadow: "lightgrey",
                        }}
                        minW={"100%"}
                    >
                        I understand
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
