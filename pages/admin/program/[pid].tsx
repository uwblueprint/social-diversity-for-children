import { SearchIcon } from "@chakra-ui/icons";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Input,
    InputGroup,
    InputLeftElement,
    VStack,
} from "@chakra-ui/react";
import { ProgramViewInfoCard } from "@components/admin/ProgramViewInfoCard";
import Wrapper from "@components/AdminWrapper";
import { Loading } from "@components/Loading";
import { locale, roles } from "@prisma/client";
import useProgram from "@utils/hooks/useProgram";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";

type ClassViewProps = {
    session: Record<string, unknown>;
};

/**
 * Admin class view page that displays the information about the class given a class id
 * @returns Admin class view page component
 */
export default function ClassView(props: ClassViewProps): JSX.Element {
    const router = useRouter();
    const { pid } = router.query;

    const {
        program,
        isLoading: isProgramLoading,
        error: programError,
    } = useProgram(parseInt(pid as string), locale.en);

    if (isProgramLoading) {
        return <Loading />;
    } else if (programError) {
        return (
            <Box>
                {"An error has occurred. Class/registrants could not be loaded"}
            </Box>
        );
    }

    return (
        <Wrapper session={props.session}>
            <VStack mx={8} spacing={8} mt={10} alignItems="flex-start">
                <Breadcrumb separator={">"}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/program">
                            Browse Programs
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink href="#" fontWeight="bold">
                            {program.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <ProgramViewInfoCard cardInfo={program} />
                <InputGroup mt="25px">
                    <InputLeftElement
                        pointerEvents="none"
                        children={<SearchIcon color="gray.300" />}
                    />
                    <Input
                        pl={8}
                        placeholder={"Search Programs"}
                        onChange={(e) => {
                            console.log(e);
                        }}
                    />
                </InputGroup>
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
        props: {},
    };
};
