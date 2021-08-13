import React from "react";
import { Box, Flex, HStack, Link, useColorModeValue } from "@chakra-ui/react";
import { SignInButton } from "@components/SignInButton";
import { LanguageModal } from "@components/LanguageModal";
import { ReactNode } from "react";
import SdcLogoBlue from "@components/icons/SdcLogoBlue";

type NavbarProps = {
    session?: Record<string, unknown>;
    height?: number | string;
};

const Links = [
    { name: "Browse Programs", url: "/" },
    { name: "My Classes", url: "#" },
];

const NavLink = ({
    href,
    children,
}: {
    href?: string;
    children: ReactNode;
}) => (
    <Link
        px={8}
        py={1}
        rounded={"md"}
        _focus={{}}
        href={href}
        textUnderlineOffset={"0.5em"}
    >
        {children}
    </Link>
);

export const DEFAULT_NAVBAR_HEIGHT = 16;

export const Navbar: React.FC<NavbarProps> = (props) => {
    const accountButton = props.session ? (
        <NavLink>My Account</NavLink>
    ) : (
        <SignInButton />
    );
    return (
        <>
            <Box bg={"transparent"} color={useColorModeValue("black", "white")}>
                <Box bg={"transparent"} px={48} pt={4} pb={8} mx={"auto"}>
                    <Flex
                        h={props.height || DEFAULT_NAVBAR_HEIGHT}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <HStack spacing={8} alignItems={"center"}>
                            <Box>
                                <Link href={"/"} _focus={{}}>
                                    <SdcLogoBlue />
                                </Link>
                            </Box>
                            <HStack
                                as={"nav"}
                                spacing={4}
                                display={{ base: "none", md: "flex" }}
                            >
                                {Links.map((linkInfo) => (
                                    <NavLink
                                        key={linkInfo.name}
                                        href={linkInfo.url}
                                    >
                                        {linkInfo.name}
                                    </NavLink>
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
