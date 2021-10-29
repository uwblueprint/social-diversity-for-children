import { Class, locale } from "@prisma/client";
import { Button, ButtonProps } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
    Box,
    Heading,
    HStack,
    VStack,
    Text,
    Link as ChakraLink,
    Center,
    CenterProps,
    BoxProps,
} from "@chakra-ui/layout";
import { Flex, Spacer } from "@chakra-ui/react";
import Wrapper from "@components/AdminWrapper";
import LiveIcon from "@components/icons/LiveIcon";
import colourTheme from "@styles/colours";
import useUpcomingClasses from "@utils/hooks/useUpcomingClasses";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { MdClass, MdCreate, MdPeople } from "react-icons/md";
import { RiCouponFill } from "react-icons/ri";

type AdminProps = {
    session: Record<string, unknown>;
};

export const EmptyState: React.FC<CenterProps> = ({
    children,
    ...props
}): JSX.Element => {
    return (
        <Center
            bg={colourTheme.colors.LightGray}
            w="100%"
            py={"40px"}
            px={"64px"}
            color={colourTheme.colors.Gray}
            border="1px"
            borderColor={colourTheme.colors.MediumGray}
            {...props}
        >
            {children}
        </Center>
    );
};

const AdminOptionButton: React.FC<
    ButtonProps & {
        icon: IconType;
        label: string;
        href?: string;
        isExternal?: boolean;
    }
> = ({ icon, label, href, isExternal, ...props }) => {
    const button = (
        <ChakraLink
            isExternal={isExternal}
            href={href && isExternal ? href : undefined}
            textDecoration="none"
            rounded={"md"}
            _active={{}}
            _hover={{}}
        >
            <Button
                border="2px"
                borderColor={colourTheme.colors.MediumGray}
                width="235px"
                px="10px"
                py="24px"
                backgroundColor="white"
                _active={{}}
                _focus={{}}
                borderRadius={"6px"}
                fontWeight="normal"
                {...props}
            >
                <Icon mr={2} as={icon} />
                {label}
            </Button>
        </ChakraLink>
    );

    return href && !isExternal ? <Link href={href}>{button}</Link> : button;
};

const AdminStatBox: React.FC<
    CenterProps & {
        amount: number;
        label: string;
    }
> = ({ amount, label, ...props }) => {
    return (
        <Center
            w={250}
            h={150}
            border="1px"
            borderColor={colourTheme.colors.MediumGray}
            {...props}
        >
            <Box>
                <Heading>{amount}</Heading>
                <Text color={colourTheme.colors.Gray}>{label}</Text>
            </Box>
        </Center>
    );
};

export default function Admin(props: AdminProps): JSX.Element {
    // At the start, we want three categories of stats
    // First is all the numerical stats, this should be really straight forward, get /admin/stats maybe...
    // Use upcoming classes, get up to three upcoming classes
    const {
        liveClass,
        upcomingClasses,
        error: classError,
        isLoading: isClassLoading,
    } = useUpcomingClasses(locale.en);

    // Figure out if there are any "live" classes, the rest are upcoming classes, which we limit to 2

    return (
        <Wrapper session={props.session}>
            <VStack spacing={6} mx={8}>
                <HStack spacing={4} mt={8}>
                    <AdminOptionButton
                        icon={MdCreate}
                        label="Create new Class"
                        href="/admin/class"
                    />
                    <AdminOptionButton
                        icon={MdClass}
                        label="Create new Program"
                        href="/admin/program"
                    />
                    <AdminOptionButton
                        icon={MdPeople}
                        label="Add Registrant"
                        href="/admin/registrant"
                    />
                    <AdminOptionButton
                        icon={RiCouponFill}
                        label="Add Coupon Code"
                        href="https://dashboard.stripe.com/coupons"
                        isExternal
                    />
                </HStack>
                <Heading size="sm" alignSelf="flex-start" fontWeight="normal">
                    Overview and Analytics
                </Heading>
                <HStack>
                    <AdminStatBox amount={1205} label="Total Registrants" />
                    <AdminStatBox amount={1205} label="Total Programs" />
                    <AdminStatBox amount={1205} label="Total Classes" />
                    <AdminStatBox amount={1205} label="Total Teacher" />
                </HStack>
                <HStack>
                    <Box>
                        <Flex alignItems="baseline">
                            <LiveIcon />
                            <Text ml={4}>Live Class</Text>
                        </Flex>
                        {/* Here, we either show loading, empty, or box */}
                        {liveClass ? (
                            // TODO: replace
                            <Box border="2px" w={380} h={360}>
                                box
                            </Box>
                        ) : (
                            <EmptyState w={380} h={360}>
                                No classes are live
                            </EmptyState>
                        )}
                    </Box>
                    <Box>
                        <Flex>
                            Upcoming Classes
                            <Spacer />
                            <Link href="/admin/program">
                                <ChakraLink color={colourTheme.colors.Blue}>
                                    See all
                                    <ArrowForwardIcon ml={4} />
                                </ChakraLink>
                            </Link>
                        </Flex>
                        <VStack>
                            {!upcomingClasses ? (
                                <>
                                    <Box border="2px" w={600} h={170}>
                                        box
                                    </Box>
                                    <Box border="2px" w={600} h={170}>
                                        box
                                    </Box>
                                </>
                            ) : (
                                <EmptyState w={600} h={360}>
                                    No upcoming classes this week
                                </EmptyState>
                            )}
                        </VStack>
                    </Box>
                </HStack>
            </VStack>
        </Wrapper>
    );
}
