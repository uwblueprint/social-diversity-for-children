import React from "react";
import { Link as ChakraLink, Box, Icon, VStack, LinkProps, Flex } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import { SdcLogoWhite } from "./icons";
import {
    MdArchive,
    MdBook,
    MdLogout,
    MdPeople,
    MdShield,
    MdSpaceDashboard,
} from "react-icons/md";
import { RiCouponFill } from "react-icons/ri";
import { IconType } from "react-icons";
import Link from "next/link";
import { signOut } from "next-auth/client";
import { Session } from "next-auth";
import { roles } from "@prisma/client";

type AdminWrapperProps = {
    session?: Session;
    children?: React.ReactNode;
};

const AdminWrapper: React.FC<AdminWrapperProps> = (props): JSX.Element => {
    return (
        <Flex h="100vh">
            <AdminNavBar role={props.session?.role} />
            <Box pl={250} w="full">
                {props.children}
            </Box>
        </Flex>
    );
};

const AdminNavBar: React.FC<{ role: roles }> = ({ role }) => {
    return (
        <Box
            position="fixed"
            p={5}
            w={250}
            zIndex={1}
            h="inherit"
            bg="#dfdfdf"
            bgColor={colourTheme.colors.Blue}
        >
            <Box pl={5}>
                <Link href="/admin">
                    <ChakraLink _focus={{}}>
                        <SdcLogoWhite />
                    </ChakraLink>
                </Link>
                <VStack spacing={5} mt={12} alignItems="flex-start">
                    <AdminNavbarButton
                        href="/admin"
                        icon={MdSpaceDashboard}
                        text={"Dashboard"}
                    />
                    <AdminNavbarButton
                        href="/admin/program"
                        icon={MdBook}
                        text={"Programs"}
                    />
                    <AdminNavbarButton
                        href="/admin/registrant"
                        icon={MdPeople}
                        text={"Registrants"}
                    />
                    {role !== roles.PROGRAM_ADMIN ? null : (
                        <>
                            <AdminNavbarButton
                                href="/admin/user"
                                icon={MdShield}
                                text={"Internal Users"}
                            />
                            <AdminNavbarButton
                                href="https://dashboard.stripe.com/coupons"
                                isExternal
                                icon={RiCouponFill}
                                text={"Coupons"}
                            />
                            <AdminNavbarButton
                                href="/admin/archived"
                                icon={MdArchive}
                                text={"Archived"}
                            />
                        </>
                    )}
                </VStack>
                <Box position="absolute" bottom={8} alignItems="flex-start">
                    <AdminNavbarButton
                        onClick={() => signOut()}
                        icon={MdLogout}
                        text={"Log out"}
                    />
                </Box>
            </Box>
        </Box>
    );
};

const AdminNavbarButton: React.FC<
    LinkProps & {
        icon: IconType;
        text: string;
        href?: string;
        isExternal?: boolean;
    }
> = ({ icon, text, href, isExternal, ...props }) => {
    const button = (
        <ChakraLink
            isExternal={isExternal}
            href={href && isExternal ? href : undefined}
            color="white"
            textDecoration="none"
            rounded={"md"}
            _active={{ color: "gray" }}
            _focus={{}}
            textUnderlineOffset={"0.5em"}
            {...props}
        >
            <>
                <Icon as={icon} mr={5} />
                {text}
            </>
        </ChakraLink>
    );

    return href && !isExternal ? <Link href={href}>{button}</Link> : button;
};

export default AdminWrapper;
