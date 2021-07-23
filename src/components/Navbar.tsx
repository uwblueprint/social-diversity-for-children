import React from "react";
import {
    Box,
    Flex,
    HStack,
    Link,
    Image,
    useColorModeValue,
} from "@chakra-ui/react";
import { SignInButton } from "@components/SignInButton";
import { LanguageModal } from "@components/LanguageModal";

type NavbarProps = {
    session?: unknown;
};

const Links = [
    { name: "Browse Programs", url: "#" },
    { name: "My Classes", url: "#" },
];

const logoSrc = "/images/logo.png";

const NavLink = ({ text, href }: { text?: string; href?: string }) => (
    <Link
        px={8}
        py={1}
        rounded={"md"}
        _focus={{}}
        href={href}
        textUnderlineOffset={"0.5em"}
    >
        {text}
    </Link>
);

export const Navbar: React.FC<NavbarProps> = (props) => {
    const accountButton = props.session ? (
        <NavLink text={"My Account"} />
    ) : (
        <SignInButton />
    );
    return (
        <>
            <Box bg={"transparent"} color={useColorModeValue("black", "white")}>
                <Box bg={"transparent"} px={48} pt={4} pb={8} mx={"auto"}>
                    <Flex
                        h={16}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <HStack spacing={8} alignItems={"center"}>
                            <Box>
                                <Link href={""}>
                                    <Image w={250} py={4} src={logoSrc} />
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
                </Box>
            </Box>
        </>
    );
};
