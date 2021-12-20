import { SearchIcon } from "@chakra-ui/icons";
import { Box, Grid, GridItem, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { AdminEmptyState } from "@components/admin/AdminEmptyState";
import { AdminHeader } from "@components/admin/AdminHeader";
import { ProgramClassInfoCard } from "@components/admin/ProgramClassInfoCard";
import { AdminError } from "@components/AdminError";
import { AdminLoading } from "@components/AdminLoading";
import Wrapper from "@components/AdminWrapper";
import { locale } from "@prisma/client";
import { weekdayToString } from "@utils/enum/weekday";
import useUpcomingClasses from "@utils/hooks/useUpcomingClasses";
import { isInternal } from "@utils/session/authorization";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { mutate } from "swr";

type BrowseUpcomingProps = {
    session: Session;
};

export const BrowseUpcoming: React.FC<BrowseUpcomingProps> = (props) => {
    const router = useRouter();
    const [searchClassTerm, setSearchClassTerm] = useState("");

    const {
        liveClass,
        upcomingClasses,
        isLoading: isClassLoading,
        error: classError,
    } = useUpcomingClasses(router.locale as locale);

    const classCards = liveClass ? [liveClass].concat(upcomingClasses) : upcomingClasses;

    if (classError) {
        return <AdminError cause="could not fetch upcoming classes" />;
    } else if (isClassLoading) {
        return <AdminLoading />;
    }

    const filteredClassCards = classCards.filter((classCard) => {
        const term = searchClassTerm.toLowerCase();
        if (term == "") {
            return classCard;
        } else if (
            classCard.name.toLowerCase().includes(term) ||
            classCard.description.toLowerCase().includes(term) ||
            classCard.teacherName.toLowerCase().includes(term) ||
            weekdayToString(classCard.weekday, locale.en).toLowerCase().includes(term)
        ) {
            return classCard;
        }
    });

    return (
        <Wrapper session={props.session}>
            <AdminHeader>Upcoming Classes</AdminHeader>
            <Box mx={6}>
                <Box>
                    <InputGroup mt="25px">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<SearchIcon color="gray.300" />}
                        />
                        <Input
                            pl={8}
                            placeholder={"Search Classes"}
                            onChange={(e) => {
                                setSearchClassTerm(e.target.value);
                            }}
                        />
                    </InputGroup>
                </Box>

                <Box mt="25px">
                    {filteredClassCards && filteredClassCards.length > 0 ? (
                        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                            {filteredClassCards.map((item, idx) => {
                                return (
                                    <GridItem key={idx}>
                                        <ProgramClassInfoCard
                                            cardInfo={item}
                                            role={props.session.role}
                                            mutateClasses={() =>
                                                mutate(["/api/class", true, "archived"])
                                            }
                                        />
                                    </GridItem>
                                );
                            })}
                        </Grid>
                    ) : (
                        <Box>
                            <AdminEmptyState w="100%" h="250px" isLoading={isClassLoading}>
                                There are no upcoming classes!
                            </AdminEmptyState>
                        </Box>
                    )}
                </Box>
            </Box>
        </Wrapper>
    );
};

export default BrowseUpcoming;

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
