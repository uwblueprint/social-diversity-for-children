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

const logoSrc =
    "https://images.squarespace-cdn.com/content/5e83092341f99d6d384777ef/1592547010897-WF00319AKLJCVGJZC3ZK/sdc+logo+with+name+alt.png?content-type=image%2Fpng";

const NavLink = ({ text, href }: { text?: string; href?: string }) => (
    <Link px={8} py={1} rounded={"md"} _focus={{}} href={href}>
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
                                    <Image h={100} py={4} src={logoSrc} />
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
