import { Flex } from "@chakra-ui/layout";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalContentProps,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { PrimaryButton, SecondaryButton } from "@components/SDCButton";
import React from "react";

export type AdminModalProps = ModalContentProps & {
    // Whether or not modal is open
    isOpen: boolean;
    // Action on close
    onClose: () => void;
    // Action on click proceed button
    onProceed: () => void;
    // Modal header text
    header: string;
    // Modal body text
    body: string;
};

/**
 * Generic admin modal component used for actions that need confirmation
 */
export const AdminModal: React.FC<AdminModalProps> = ({
    isOpen,
    onClose,
    onProceed,
    header,
    body,
    ...props
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent py={5} textAlign="center" {...props}>
                <ModalHeader fontSize="2xl">{header}</ModalHeader>
                <ModalBody>{body}</ModalBody>
                <ModalFooter>
                    <Flex direction="column" w="100%">
                        <PrimaryButton
                            w="inherit"
                            onClick={() => {
                                onProceed();
                                onClose();
                            }}
                        >
                            Proceed
                        </PrimaryButton>
                        <SecondaryButton w="inherit" onClick={onClose}>
                            Cancel
                        </SecondaryButton>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
