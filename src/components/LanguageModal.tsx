import React, { useState } from "react";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Radio,
    RadioGroup,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

type LanguageModalProps = { currentLanguage: string };

const Languages = [
    { locale: "en", label: "English" },
    { locale: "zh", label: "中文" },
    { locale: "ko", label: "한국어" },
    { locale: "ja", label: "日本語" },
];

export const LanguageModal: React.FC<LanguageModalProps> = ({ currentLanguage }) => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [language, setLanguage] = useState(currentLanguage);
    return (
        <>
            <Button
                onClick={onOpen}
                variant={"link"}
                cursor={"pointer"}
                color={"black"}
                _focus={{}}
            >
                {currentLanguage.toUpperCase()}
                <ChevronDownIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent w={56} minH={80}>
                    <ModalBody>
                        <Text py={4} textAlign={"center"} fontWeight={"700"}>
                            Select a language
                        </Text>
                        <RadioGroup value={language} onChange={setLanguage}>
                            <Stack>
                                {Languages.map((language) => (
                                    <Radio key={language.locale} py={2} value={language.locale}>
                                        {language.label}
                                    </Radio>
                                ))}
                            </Stack>
                        </RadioGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            bg={"#0C53A0"}
                            color={"white"}
                            mx={"auto"}
                            my={2}
                            borderRadius="6px"
                            onClick={() =>
                                router.push(router.asPath, undefined, {
                                    locale: language,
                                })
                            }
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
                            w="100%"
                        >
                            Apply
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
