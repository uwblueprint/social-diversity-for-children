import { SearchIcon } from "@chakra-ui/icons";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Grid,
    GridItem,
    Input,
    InputGroup,
    InputLeftElement,
    VStack,
} from "@chakra-ui/react";
import { AdminEmptyState } from "@components/admin/AdminEmptyState";
import { ArchivedProgramClassInfoCard } from "@components/admin/ArchivedProgramClassInfoCard";
import Wrapper from "@components/AdminWrapper";
import { locale } from "@prisma/client";
import { weekdayToString } from "@utils/enum/weekday";
import useClassesByProgram from "@utils/hooks/UseClassesByProgram";
import useProgram from "@utils/hooks/useProgram";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AdminError } from "@components/AdminError";
import { AdminLoading } from "@components/AdminLoading";
import { Session } from "next-auth";
import { isInternal } from "@utils/session/authorization";
import { ArchivedProgramViewInfoCard } from "@components/admin/ArchivedProgramViewInfoCard";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AdminHeader } from "@components/admin/AdminHeader";

type ArchiveProgramClassViewProps = {
    session: Session;
};

/**
 * Admin program class view page that displays the classes of a program
 * @returns Admin program class view page component
 */
export default function ArchivedProgramClassView({
    session,
}: ArchiveProgramClassViewProps): JSX.Element {
    const router = useRouter();
    const { pid } = router.query;
    const [searchTerm, setSearchTerm] = useState("");

    const {
        program,
        isLoading: isProgramLoading,
        error: programError,
    } = useProgram(parseInt(pid as string), locale.en, true);

    const {
        classCards,
        isLoading: isClassLoading,
        mutate: mutateClasses,
    } = useClassesByProgram(pid as string, locale.en, true);

    if (programError) {
        return <AdminError cause="program not found" />;
    } else if (isProgramLoading || isClassLoading) {
        return <AdminLoading />;
    }

    const filteredClasses = classCards.filter((classCard) => {
        const term = searchTerm.toLowerCase();
        if (term == "") {
            return classCard;
        } else if (
            classCard.name.toLowerCase().includes(term) ||
            classCard.borderAge.toString().includes(term) ||
            classCard.teacherName.toLowerCase().includes(term) ||
            weekdayToString(classCard.weekday, locale.en).toLowerCase().includes(term)
        ) {
            return classCard;
        }
    });

    return (
        <Wrapper session={session}>
            <AdminHeader>Archive</AdminHeader>
            <VStack mx={8} spacing={6} alignItems="flex-start">
                <Breadcrumb separator={">"}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/archive">Browse Archived</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink href="#" fontWeight="bold">
                            {program.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <ArchivedProgramViewInfoCard cardInfo={program} role={session.role} />
                <InputGroup mt="25px">
                    <InputLeftElement
                        pointerEvents="none"
                        children={<SearchIcon color="gray.300" />}
                    />
                    <Input
                        pl={8}
                        placeholder={"Search Classes"}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                    />
                </InputGroup>
                {filteredClasses && filteredClasses.length > 0 ? (
                    <Grid templateColumns="repeat(2, 1fr)" gap={4} w="100%">
                        {filteredClasses.map((classCard, idx) => {
                            return (
                                <GridItem key={idx}>
                                    <ArchivedProgramClassInfoCard
                                        cardInfo={classCard}
                                        role={session.role}
                                        mutateClasses={mutateClasses}
                                    />
                                </GridItem>
                            );
                        })}
                    </Grid>
                ) : (
                    <AdminEmptyState isLoading={isClassLoading} minH={250}>
                        No Classes available
                    </AdminEmptyState>
                )}
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
