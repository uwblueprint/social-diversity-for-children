import React from "react";
import {
    Link as ChakraLink,
    Box,
    Icon,
    VStack,
    LinkProps,
    Flex,
} from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import { SdcLogoWhite } from "./icons";
import {
    MdArchive,
    MdBook,
    MdLogout,
    MdPeople,
    MdSpaceDashboard,
} from "react-icons/md";
import { RiCouponFill } from "react-icons/ri";
import { IconType } from "react-icons";
import Link from "next/link";
import { signOut } from "next-auth/client";

type AdminWrapperProps = {
    session?: Record<string, unknown>;
    children?: React.ReactNode;
};

const AdminWrapper: React.FC<AdminWrapperProps> = (props): JSX.Element => {
    return (
        <Flex position={"relative"} h="100vh">
            <AdminNavBar />
            <Box>{props.children}</Box>
        </Flex>
    );
};

const AdminNavBar: React.FC = () => {
    return (
        <Box
            p={5}
            w={275}
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