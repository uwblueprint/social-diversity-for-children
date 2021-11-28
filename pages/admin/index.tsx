import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
    Box,
    Heading,
    HStack,
    Link as ChakraLink,
    Text,
    VStack,
} from "@chakra-ui/layout";
import { Flex, List, ListItem, Spacer } from "@chakra-ui/react";
import { AdminEmptyState } from "@components/admin/AdminEmptyState";
import { AdminOptionButton } from "@components/admin/AdminOptionButton";
import { AdminStatBox } from "@components/admin/AdminStatBox";
import { LiveClassCard } from "@components/admin/LiveClassCard";
import { UpcomingClassCard } from "@components/admin/UpcomingClassCard";
import Wrapper from "@components/AdminWrapper";
import LiveIcon from "@components/icons/LiveIcon";
import { locale } from "@prisma/client";
import colourTheme from "@styles/colours";
import useGetZoomLink from "@utils/hooks/useGetZoomLink";
import useStats from "@utils/hooks/useStats";
import useUpcomingClasses from "@utils/hooks/useUpcomingClasses";
import { isInternal } from "@utils/session/authorization";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import React from "react";
import { MdClass, MdCreate, MdPeople } from "react-icons/md";
import { RiCouponFill } from "react-icons/ri";

type AdminProps = {
    session: Session;
};

/**
 * Admin dasboard page that displays the platform stats, live classes, and upcoming classes
 * @returns Admin dashboard page component
 */
export default function Admin(props: AdminProps): JSX.Element {
    const {
        liveClass,
        upcomingClasses,
        isLoading: isUpcomingLoading,
    } = useUpcomingClasses(locale.en);

    const {
        totalRegistrants,
        totalPrograms,
        totalClasses,
        totalTeachers,
        isLoading: isStatLoading,
    } = useStats();

    const { link, isLoading: isZoomLoading } = useGetZoomLink();

    return (
        <Wrapper session={props.session}>
            <VStack spacing={6} mx={8}>
                <HStack spacing={4} mt={8} w="100%">
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
                <HStack spacing={4} alignSelf="start">
                    <AdminStatBox
                        amount={totalRegistrants}
                        isLoading={isStatLoading}
                        label="Total Registrants"
                    />
                    <AdminStatBox
                        amount={totalPrograms}
                        isLoading={isStatLoading}
                        label="Total Programs"
                    />
                    <AdminStatBox
                        amount={totalClasses}
                        isLoading={isStatLoading}
                        label="Total Classes"
                    />
                    <AdminStatBox
                        amount={totalTeachers}
                        isLoading={isStatLoading}
                        label="Total Teachers"
                    />
                </HStack>
                <HStack w="100%" spacing={5}>
                    <Box>
                        <Flex alignItems="baseline" mb={5}>
                            <LiveIcon />
                            <Text ml={4}>Live Class</Text>
                        </Flex>
                        <Box h={350} w={380}>
                            {/* Here, we either show loading, empty, or box */}
                            {liveClass && link ? (
                                <LiveClassCard cardInfo={liveClass} link={link} />
                            ) : (
                                <AdminEmptyState
                                    isLoading={isUpcomingLoading || isZoomLoading}
                                    h="100%"
                                >
                                    No classes are live
                                </AdminEmptyState>
                            )}
                        </Box>
                    </Box>
                    <Box>
                        <Flex mb={5}>
                            Upcoming Classes
                            <Spacer />
                            <Link href="/admin/program">
                                <ChakraLink color={colourTheme.colors.Blue}>
                                    See all
                                    <ArrowForwardIcon ml={4} />
                                </ChakraLink>
                            </Link>
                        </Flex>
                        <VStack h={350}>
                            {upcomingClasses && upcomingClasses.length > 0 ? (
                                <List spacing={5} w={625}>
                                    {upcomingClasses.slice(0, 2).map((item, idx) => {
                                        return (
                                            <ListItem key={idx}>
                                                <UpcomingClassCard cardInfo={item} />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            ) : (
                                <AdminEmptyState
                                    w={625}
                                    h="100%"
                                    isLoading={isUpcomingLoading}
                                >
                                    No upcoming classes this week
                                </AdminEmptyState>
                            )}
                        </VStack>
                    </Box>
                </HStack>
            </VStack>
        </Wrapper>
    );
}

/**
 * getServerSideProps gets the session before this page is rendered
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    // obtain the next auth session
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    } else if (!isInternal(session)) {
        return {
            redirect: {
                destination: "/no-access",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
            ...(await serverSideTranslations(context.locale, ["common"])),
        },
    };
};
