import {
    Box,
    Text,
    InputGroup,
    InputLeftElement,
    Input,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import Wrapper from "@components/AdminWrapper";
import React from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { BrowseProgramCard } from "@components/BrowseProgramCard";
import { locale } from "@prisma/client";
import usePrograms from "@utils/hooks/usePrograms";
import { useRouter } from "next/router";
import { Loading } from "@components/Loading";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AdminEmptyState } from "@components/admin/AdminEmptyState";
import { useState } from "react";
import { roles } from ".prisma/client";
import { AdminHeader } from "@components/admin/AdminHeader";
import { Session } from "next-auth";

type BrowseProgramsProps = {
    session: Session;
};

const headerLinks = [
    { name: "Add Program", url: "/admin/program/create" },
    { name: "Add Class", url: "/admin/class/create" },
];

export const BrowsePrograms: React.FC<BrowseProgramsProps> = (props) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const {
        programs: programCardInfos,
        isLoading,
        error,
    } = usePrograms(router.locale as locale);

    if (isLoading) {
        return <Loading />;
    } else if (error) {
        return <Box>An Error has occurred</Box>;
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
            <Box>
                <AdminHeader headerLinks={headerLinks}>Programs</AdminHeader>

                <Box px="50px">
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

                <Box ml="50px" mt="25px">
                    {filteredCards && filteredCards.length > 0 ? (
                        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                            {filteredCards.map((item, idx) => {
                                return (
                                    <GridItem key={idx}>
                                        <BrowseProgramCard cardInfo={item} />
                                    </GridItem>
                                );
                            })}
                        </Grid>
                    ) : (
                        <Box pr="50px">
                            <AdminEmptyState
                                w="100%"
                                h="250px"
                                isLoading={isLoading}
                            >
                                There are no programs available!
                            </AdminEmptyState>
                        </Box>
                    )}
                </Box>
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
    } else if (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ![roles.PROGRAM_ADMIN, roles.TEACHER].includes((session as any).role)
    ) {
        return {
            redirect: {
                destination: "/no-access",
                permanent: false,
            },
        };
    }

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ["common"])),
        },
    };
};
