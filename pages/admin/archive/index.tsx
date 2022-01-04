import {
    Box,
    InputGroup,
    InputLeftElement,
    Input,
    Grid,
    GridItem,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import Wrapper from "@components/AdminWrapper";
import React from "react";
import { SearchIcon } from "@chakra-ui/icons";
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
import { ArchivedBrowseProgramCard } from "@components/admin/ArchivedBrowseProgramCard";
import { isAdmin } from "@utils/session/authorization";
import useClasses from "@utils/hooks/useClasses";
import { AdminError } from "@components/AdminError";
import { AdminLoading } from "@components/AdminLoading";
import { weekdayToString } from "@utils/enum/weekday";
import { ArchivedProgramClassInfoCard } from "@components/admin/ArchivedProgramClassInfoCard";
import { mutate } from "swr";
import convertCamelToText from "@utils/convertCamelToText";

type ArchiveBrowseProgramsProps = {
    session: Session;
};

export const ArchiveBrowsePrograms: React.FC<ArchiveBrowseProgramsProps> = (props) => {
    const router = useRouter();
    const [searchProgramTerm, setSearchProgramTerm] = useState("");
    const [searchClassTerm, setSearchClassTerm] = useState("");

    const {
        programs,
        isLoading: isProgramsLoading,
        error: programError,
    } = usePrograms(router.locale as locale, true);
    const {
        classCards,
        isLoading: isClassLoading,
        error: classError,
    } = useClasses(router.locale as locale, true);

    if (programError) {
        return <AdminError cause="could not fetch programs" />;
    } else if (classError) {
        return <AdminError cause="could not fetch classes" />;
    } else if (isProgramsLoading || isClassLoading) {
        return <AdminLoading />;
    }

    const filteredProgramCards = programs.filter((prog) => {
        const term = searchProgramTerm.toLowerCase();
        if (term == "") {
            return prog;
        } else if (
            prog.name.toLowerCase().includes(term) ||
            prog.description.toLowerCase().includes(term) ||
            convertCamelToText(prog.onlineFormat).toLowerCase().includes(term) ||
            prog.onlineFormat.toLowerCase().includes(term) ||
            prog.tag.toLowerCase().includes(term)
        ) {
            return prog;
        }
    });
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
            <AdminHeader>Archived</AdminHeader>

            <Tabs mx={6}>
                <TabList>
                    <Tab>Class</Tab>
                    <Tab>Program</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
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
                                                <ArchivedProgramClassInfoCard
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
                                        There are no classes archived!
                                    </AdminEmptyState>
                                </Box>
                            )}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <Box>
                            <InputGroup mt="25px">
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<SearchIcon color="gray.300" />}
                                />
                                <Input
                                    pl={8}
                                    placeholder={"Search Programs"}
                                    onChange={(e) => {
                                        setSearchProgramTerm(e.target.value);
                                    }}
                                />
                            </InputGroup>
                        </Box>

                        <Box mt="25px">
                            {filteredProgramCards && filteredProgramCards.length > 0 ? (
                                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                                    {filteredProgramCards.map((item, idx) => {
                                        return (
                                            <GridItem key={idx}>
                                                <ArchivedBrowseProgramCard
                                                    cardInfo={item}
                                                    role={props.session.role}
                                                />
                                            </GridItem>
                                        );
                                    })}
                                </Grid>
                            ) : (
                                <Box>
                                    <AdminEmptyState
                                        w="100%"
                                        h="250px"
                                        isLoading={isProgramsLoading}
                                    >
                                        There are no programs archived!
                                    </AdminEmptyState>
                                </Box>
                            )}
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Wrapper>
    );
};

export default ArchiveBrowsePrograms;

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
    } else if (!isAdmin(session)) {
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
