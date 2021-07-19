import { ReactNode } from "react";
import {
    Box,
    Flex,
    HStack,
    Link,
    Image,
    useDisclosure,
    useColorModeValue,
    Stack,
} from "@chakra-ui/react";
import { SignInButton } from "@components/SignInButton";
import { LanguageModal } from "./LanguageModal";

const Links = [
    { name: "Browse Programs", url: "#" },
    { name: "My Classes", url: "#" },
];

const NavLink = ({ text, href }: { text?: string; href?: string }) => (
    <Link
        px={8}
        py={1}
        rounded={"md"}
        // _hover={{
        //     textDecoration: "none",
        //     bg: useColorModeValue("gray.200", "gray.700"),
        // }}
        _focus={{}}
        href={href}
    >
        {text}
    </Link>
);

export function Navbar(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const accountButton = props.session ? (
        <NavLink text={"My Account"} />
    ) : (
        <SignInButton />
    );
    return (
        <>
            <Box
                // bg={"transparent"}
                bg={"lightgrey"}
                color={useColorModeValue("black", "white")}
                px={4}
                py={4}
                w={"100%"}
            >
                <Image src="public/images/SDC Logo - Original.png" />
                <Flex
                    h={16}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <HStack spacing={8} alignItems={"center"}>
                        <Box>
                            <Link href={""}>
                                <Image
                                    h={100}
                                    py={4}
                                    src="https://images.squarespace-cdn.com/content/v1/5e83092341f99d6d384777ef/1592545178617-8IPTVQIWZEID0O9CDZOE/sdc+logo+with+name.png%3Fformat=1500w"
                                />
                            </Link>
                        </Box>
                        <HStack
                            as={"nav"}
                            spacing={4}
                            display={{ base: "none", md: "flex" }}
                        >
                            {Links.map((linkInfo) => (
                                <NavLink
                                    text={linkInfo.name}
                                    href={linkInfo.url}
                                />
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={"center"}>
                        {accountButton}
                        <LanguageModal currentLanguage={"en"} />
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: "none" }}>
                        <Stack as={"nav"} spacing={4}>
                            {Links.map((linkInfo) => (
                                <NavLink
                                    text={linkInfo.name}
                                    href={linkInfo.url}
                                />
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
