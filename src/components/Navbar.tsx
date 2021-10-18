import React from "react";
import {
    Box,
    Flex,
    HStack,
    Link as ChakraLink,
    useColorModeValue,
} from "@chakra-ui/react";
import { SignInButton } from "@components/SignInButton";
import { LanguageModal } from "@components/LanguageModal";
import { ReactNode } from "react";
import SdcLogoBlue from "@components/icons/SdcLogoBlue";
import { useRouter } from "next/router";
import Link from "next/link";

type NavbarProps = {
    session?: Record<string, unknown>;
    height?: number | string;
};

const Links = [
    { name: "Browse Programs", url: "/" },
    { name: "My Classes", url: "/class" },
];

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => (
    <Link href={href}>
        <ChakraLink
            px={8}
            py={1}
            rounded={"md"}
            _focus={{}}
            textUnderlineOffset={"0.5em"}
        >
            {children}
        </ChakraLink>
    </Link>
);

export const DEFAULT_NAVBAR_HEIGHT = 16;

export const Navbar: React.FC<NavbarProps> = (props) => {
    const router = useRouter();
    const accountButton = props.session ? (
        <NavLink href="/myaccounts">My Account</NavLink>
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
                                <Link href="/">
                                    <ChakraLink _focus={{}}>
                                        <SdcLogoBlue />
                                    </ChakraLink>
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
                            <LanguageModal currentLanguage={router.locale} />
                        </Flex>
                    </Flex>
                </Box>
            </Box>
        </>
    );
};
