import { Box, Text, InputGroup, InputLeftElement, Input, Grid, GridItem } from "@chakra-ui/react";
import Wrapper from "@components/AdminWrapper";
import React from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { BrowseProgramCard } from "@components/admin/BrowseProgramCard";
import { locale } from "@prisma/client";
import usePrograms from "@utils/hooks/usePrograms";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AdminEmptyState } from "@components/admin/AdminEmptyState";
import { useState } from "react";
import { AdminHeader } from "@components/admin/AdminHeader";
import { Session } from "next-auth";
import { AdminLoading } from "@components/AdminLoading";
import { AdminError } from "@components/AdminError";
import { isInternal } from "@utils/session/authorization";
import useMe from "@utils/hooks/useMe";
import { roles } from ".prisma/client";

type BrowseProgramsProps = {
    session: Session;
};

const headerLinks = [
    { name: "Add Program", url: "/admin/program/edit/new" },
    { name: "Add Class", url: "/admin/class/edit/new" },
];

export const BrowsePrograms: React.FC<BrowseProgramsProps> = (props) => {
    const router = useRouter();
    const { me, isLoading: isMeLoading, error: meError } = useMe();
    const [searchTerm, setSearchTerm] = useState("");

    const { programs: programCardInfos, isLoading, error } = usePrograms(router.locale as locale);

    if (error) {
        return <AdminError cause="could not fetch programs" />;
    } else if (isLoading) {
        return <AdminLoading />;
    }

    const filteredCards = programCardInfos.filter((prog) => {
        const term = searchTerm.toLowerCase();
        if (term == "") {
            return prog;
        } else if (
            prog.name.toLowerCase().includes(term) ||
            prog.description.toLowerCase().includes(term) ||
            prog.onlineFormat.toLowerCase().includes(term) ||
            prog.tag.toLowerCase().includes(term)
        ) {
            return prog;
        }
    });
    return (
        <Wrapper session={props.session}>
            <AdminHeader
                headerLinks={
                    !isMeLoading && !meError && me.role !== roles.TEACHER ? headerLinks : []
                }
            >
                Programs
            </AdminHeader>

            <Box mx={8}>
                <Text fontSize="16px">Browse Programs</Text>
                <InputGroup mt="25px">
                    <InputLeftElement
                        pointerEvents="none"
                        children={<SearchIcon color="gray.300" />}
                    />
                    <Input
                        pl={8}
                        placeholder={"Search Programs"}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                    />
                </InputGroup>
            </Box>

            <Box mx={8} mt="25px">
                {filteredCards && filteredCards.length > 0 ? (
                    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                        {filteredCards.map((item, idx) => {
                            return (
                                <GridItem key={idx}>
                                    <BrowseProgramCard cardInfo={item} role={props.session.role} />
                                </GridItem>
                            );
                        })}
                    </Grid>
                ) : (
                    <Box>
                        <AdminEmptyState w="100%" h="250px" isLoading={isLoading}>
                            There are no programs available!
                        </AdminEmptyState>
                    </Box>
                )}
            </Box>
        </Wrapper>
    );
};

export default BrowsePrograms;

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
