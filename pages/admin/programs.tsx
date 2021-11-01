import {
    Box,
    Flex,
    HStack,
    Link,
    useColorModeValue,
    Text,
    Button,
    Divider,
    InputGroup,
    InputLeftElement,
    Input,
    List,
    ListItem,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import Wrapper from "@components/AdminWrapper";
import React from "react";
import { ReactNode } from "react";
import colourTheme from "@styles/colours";
import { SmallAddIcon } from "@chakra-ui/icons";
import { SearchIcon } from "@chakra-ui/icons";
import { BrowseProgramCard } from "@components/BrowseProgramCard";
import type { ProgramCardInfo } from "models/Program";
import { locale, programFormat } from "@prisma/client";
import usePrograms from "@utils/usePrograms";
import { useRouter } from "next/router";
import { Loading } from "@components/Loading";
import { GetServerSideProps } from "next"; // Get server side props
import { getSession } from "next-auth/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AdminEmptyState } from "@components/admin/AdminEmptyState";

type BrowseProgramsProps = {
    session: Record<string, unknown>;
};

const Links = [
    { name: "Add Program", url: "/" },
    { name: "Add Class", url: "/" },
];

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => (
    <Link href={href}>
        <HStack>
            <Button
                fontSize="16px"
                backgroundColor="white"
                fontWeight="400"
                px={"16px"}
                py={"8px"}
                border-radius="6px"
                border="1px solid #0C53A0"
            >
                <SmallAddIcon mr="11px" />
                {children}
            </Button>
        </HStack>
    </Link>
);

export const BrowsePrograms: React.FC<BrowseProgramsProps> = (props) => {
    const router = useRouter();

    const {
        programs: programCardInfos,
        isLoading,
        error,
    } = usePrograms(router.locale as locale);

    if (error) {
        return <Box>{"An error has occurred: " + error.toString()}</Box>;
    }
    if (isLoading) {
        return <Loading />;
    }
    const programCardArray = programCardInfos.map((cardInfo) => (
        <BrowseProgramCard cardInfo={cardInfo} />
    ));

    return (
        <Wrapper session={props.session}>
            <Box bg={"transparent"} color={useColorModeValue("black", "white")}>
                <Box bg={"transparent"} px={"50px"} pt={"20px"} mx={"auto"}>
                    <Flex
                        h={"94px"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <HStack spacing={8} alignItems={"center"}>
                            <Text
                                fontSize="22px"
                                font-weight="bold"
                                color={colourTheme.colors.Blue}
                            >
                                Dashboard
                            </Text>
                        </HStack>
                        <Flex alignItems={"center"}>
                            <HStack
                                spacing={4}
                                display={{ base: "none", md: "flex" }}
                            >
                                {Links.map((linkInfo) => (
                                    <NavLink
                                        key={linkInfo.name}
                                        href={linkInfo.url}
                                    >
                                        {linkInfo.name}
                                    </NavLink>
                                ))}
                            </HStack>
                        </Flex>
                    </Flex>
                </Box>
            </Box>
            <Divider
                orientation="horizontal"
                marginTop="25px"
                marginBottom="30px"
                border="2px"
            />
            <Text px="50px" fontSize="16px">
                Browse Programs
            </Text>

            <InputGroup mx="50px" mt="25px">
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                />
                <Input type="programs" placeholder="Search SDC Programs" />
            </InputGroup>

            <Box mx="50px" mt="25px">
                {programCardInfos && programCardInfos.length > 0 ? (
                    <Grid templateColumns="repeat(3, 1fr)">
                        {programCardInfos.map((item, idx) => {
                            return (
                                <GridItem key={idx}>
                                    <BrowseProgramCard cardInfo={item} />
                                </GridItem>
                            );
                        })}
                    </Grid>
                ) : (
                    <AdminEmptyState w={625} h="100%" isLoading={isLoading}>
                        No upcoming classes this week
                    </AdminEmptyState>
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
    // TODO : check session for admin/volunteer , if not redirect to no access
    // refer to github
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ["common"])),
        },
    };
};
