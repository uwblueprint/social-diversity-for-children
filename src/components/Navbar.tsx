import React from "react";
import {
    Box,
    Flex,
    HStack,
    Icon,
    Link as ChakraLink,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Button,
    Divider,
    Text,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { MdOutlineClass, MdOutlineDns, MdLogout } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import colourTheme from "@styles/colours";
import { SignInButton } from "@components/SignInButton";
import { LanguageModal } from "@components/LanguageModal";
import { ReactNode } from "react";
import SdcLogoBlue from "@components/icons/SdcLogoBlue";
import { useRouter } from "next/router";
import Link from "next/link";
import { Session } from "next-auth";
import { useTranslation } from "next-i18next";
import { signOut } from "next-auth/client";

type NavbarProps = {
    session?: Session;
    height?: number | string;
};

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => (
    <Link href={href}>
        <ChakraLink px={8} py={1} rounded={"md"} _focus={{}} textUnderlineOffset={"0.5em"}>
            {children}
        </ChakraLink>
    </Link>
);

const SideBar = ({
    isOpen,
    onClose,
    session,
}: {
    isOpen: boolean;
    onClose: () => void;
    session: Session;
}) => {
    const loggedIn = session ? true : false;

    return (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerContent height="100vh">
                <DrawerCloseButton />
                <DrawerHeader>
                    {loggedIn ? (
                        <Box mt="20">
                            <Text fontSize="2xl" fontWeight="bold">
                                Welcome
                            </Text>
                            <Text fontSize="md" fontWeight="normal" mt="5" mb="15">
                                {session.user.email}
                            </Text>
                            <Divider mt="15" mb="15" />
                        </Box>
                    ) : (
                        <Box mt="20">
                            <Text fontSize="md" fontWeight="normal">
                                Sign in now to register for classes
                            </Text>
                            <Button
                                height="50px"
                                width="100%"
                                borderRadius="6px"
                                background={colourTheme.colors.Blue}
                                fontWeight="normal"
                                fontSize="16px"
                                color="white"
                                mt="5"
                                mb="15"
                            >
                                Sign In
                            </Button>
                            <Divider mt="15" mb="15" color="#cdcdcd" />
                        </Box>
                    )}
                </DrawerHeader>
                <DrawerBody>
                    <Flex flexDirection="row" mt="5" mb="5" alignItems="center">
                        <Icon as={MdOutlineDns} width={6} height={6} />
                        <NavLink href="/">Browse Programs</NavLink>
                    </Flex>
                    <Flex flexDirection="row" mt="5" mb="5" alignItems="center">
                        <Icon as={MdOutlineClass} width={6} height={6} />
                        <NavLink href="/class">View My Classes</NavLink>
                    </Flex>
                    {loggedIn && (
                        <Flex flexDirection="row" mt="5" mb="5" alignItems="center">
                            <Icon as={BiUserCircle} width={6} height={6} />
                            <NavLink href="/myaccounts">Account</NavLink>
                        </Flex>
                    )}
                </DrawerBody>
                <DrawerFooter>
                    {loggedIn && (
                        <Box w="100%">
                            <Divider mt="15" mb="15" />
                            <Flex alignItems="center">
                                <Icon as={MdLogout} width={6} height={6} />
                                <Text marginLeft="5" cursor="pointer" onClick={() => signOut()}>
                                    Log Out
                                </Text>
                            </Flex>
                        </Box>
                    )}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export const DEFAULT_NAVBAR_HEIGHT = 16;

export const Navbar: React.FC<NavbarProps> = (props) => {
    const router = useRouter();
    const { t } = useTranslation("common");
    const isSidebar = useBreakpointValue({ base: true, lg: false });
    const { isOpen, onOpen, onClose } = useDisclosure();

    const accountButton = props.session ? (
        <NavLink href="/myaccounts">{t("nav.myAccount")}</NavLink>
    ) : (
        <SignInButton />
    );

    const Links = [
        { name: t("nav.browseProgram"), url: "/" },
        { name: t("nav.myClasses"), url: "/class" },
    ];

    return (
        <>
            <SideBar isOpen={isOpen} onClose={onClose} session={props.session} />
            <Box bg={"transparent"} color={useColorModeValue("black", "white")}>
                <Box
                    bg={"transparent"}
                    px={{ base: "5", md: "15", lg: "48" }}
                    pt={4}
                    pb={8}
                    mx={"auto"}
                >
                    <Flex
                        h={props.height || DEFAULT_NAVBAR_HEIGHT}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <HStack spacing={4} alignItems={"center"}>
                            {isSidebar && (
                                <Button bgColor={"white"} onClick={onOpen}>
                                    <HamburgerIcon w={6} h={6} />
                                </Button>
                            )}
                            <Box>
                                <Link href="/">
                                    <ChakraLink _focus={{}}>
                                        <SdcLogoBlue />
                                    </ChakraLink>
                                </Link>
                            </Box>
                            <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
                                {Links.map((linkInfo) => (
                                    <NavLink key={linkInfo.name} href={linkInfo.url}>
                                        {linkInfo.name}
                                    </NavLink>
                                ))}
                            </HStack>
                        </HStack>
                        <Flex alignItems={"center"}>
                            {!isSidebar && accountButton}
                            <LanguageModal currentLanguage={router.locale} />
                        </Flex>
                    </Flex>
                </Box>
            </Box>
        </>
    );
};
