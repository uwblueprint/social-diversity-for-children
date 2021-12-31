import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, GridItem, Heading, Link as ChakraLink, Text, VStack } from "@chakra-ui/layout";
import { Flex, Grid, List, ListItem, Spacer } from "@chakra-ui/react";
import { AdminEmptyState } from "@components/admin/AdminEmptyState";
import { AdminHeader } from "@components/admin/AdminHeader";
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
import { MdClass, MdCreate, MdPersonAdd } from "react-icons/md";
import { RiCouponFill } from "react-icons/ri";
import { roles } from "@prisma/client";

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
            <AdminHeader>Dashboard</AdminHeader>
            <VStack spacing={5} mx={8} pb={4} align="flex-start">
                {props.session?.role !== roles.TEACHER ? (
                    <Grid templateColumns="repeat(4, 1fr)" gap={4} w="100%">
                        <AdminOptionButton
                            icon={MdCreate}
                            label="Create new Class"
                            href="/admin/class/edit/new"
                        />
                        <AdminOptionButton
                            icon={MdClass}
                            label="Create new Program"
                            href="/admin/program/edit/new"
                        />
                        <AdminOptionButton
                            icon={MdPersonAdd}
                            label="Add SDC Member"
                            href="/admin/add"
                        />
                        <AdminOptionButton
                            icon={RiCouponFill}
                            label="Add Coupon Code"
                            href="https://dashboard.stripe.com/coupons"
                            isExternal
                        />
                    </Grid>
                ) : null}
                <Heading size="sm" alignSelf="flex-start" fontWeight="normal">
                    Overview and Analytics
                </Heading>
                <Grid templateColumns="repeat(4, 1fr)" gap={4} w="100%">
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
                </Grid>
                <Grid templateColumns="repeat(3, 1fr)" gap={4} w="100%">
                    <GridItem minW={380} colSpan={1}>
                        <Flex alignItems="baseline" mb={5}>
                            <LiveIcon filter={liveClass ? undefined : "grayscale(1)"} />
                            <Text ml={4}>Live Class</Text>
                        </Flex>
                        <Box h={350}>
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
                    </GridItem>
                    <GridItem colSpan={2}>
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
                                <List spacing={5} w="100%">
                                    {upcomingClasses.slice(0, 2).map((item, idx) => {
                                        return (
                                            <ListItem key={idx}>
                                                <UpcomingClassCard cardInfo={item} />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            ) : (
                                <AdminEmptyState minW={625} h="100%" isLoading={isUpcomingLoading}>
                                    No upcoming classes this week
                                </AdminEmptyState>
                            )}
                        </VStack>
                    </GridItem>
                </Grid>
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
