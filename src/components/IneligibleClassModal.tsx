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
import colourTheme from "@styles/colours";
import { useTranslation } from "next-i18next";

type IneligibleClassModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

/**
 * Modal for ineligible class registration
 * @param isOpen a boolean from the useDisclosure hook
 * @param onClose a method from the useDisclosure hook
 * @returns a modal component informing user they cannot register in class
 */
export const IneligibleClassModal: React.FC<IneligibleClassModalProps> = ({
    isOpen,
    onClose,
}) => {
    const { t } = useTranslation("common");

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent p={5}>
                <ModalBody>
                    <Text>{t("program.notEligible")}</Text>
                </ModalBody>

                <ModalFooter>
                    <Button
                        bg={colourTheme.colors.Blue}
                        color={"white"}
                        mx={"auto"}
                        my={2}
                        onClick={onClose}
                        fontWeight={"200"}
                        _hover={{
                            textDecoration: "none",
                            bg: colourTheme.colors.LightBlue,
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
                        {t("program.understood")}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
