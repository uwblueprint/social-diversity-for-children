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
import React from "react";
import colourTheme from "@styles/colours";
import { GetServerSideProps } from "next"; // Get server side props
import { getSession } from "next-auth/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Wrapper from "@components/AdminWrapper";
import { useRouter } from "next/router";
import { SmallAddIcon } from "@chakra-ui/icons";
import { ReactNode } from "react";
import { ClassCardInfo } from "@models/Class";
import { fetcherWithId } from "@utils/fetcher";
import useSWR from "swr";
import { Loading } from "@components/Loading";
import CardInfoUtil from "utils/cardInfoUtil";
import { locale } from "@prisma/client";
import { ProgramDescriptionCard } from "@components/ProgramDescriptionCard";

type BrowseClassesProps = {
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

export const BrowseClasses: React.FC<BrowseClassesProps> = (props) => {
    const router = useRouter();
    const { pid } = router.query;

    // refetch program data
    const { data: programInfoResponse, error: programInfoError } = useSWR(
        ["/api/program/" + pid, pid, router.locale],
        fetcherWithId,
    );
    const isProgramInfoLoading = !programInfoResponse && !programInfoError;

    if (isProgramInfoLoading) {
        return <Loading />;
    } else if (programInfoError) {
        return <Box>An Error has occured</Box>;
    }

    const programCardInfo = programInfoResponse
        ? CardInfoUtil.getProgramCardInfo(
              programInfoResponse.data,
              router.locale as locale,
          )
        : null;

    if (!programCardInfo) {
        return <Loading />;
    }

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
                                fontWeight="bold"
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
                {"Browse Programs >"} <b>{programCardInfo.name}</b>
            </Text>
        </Wrapper>
    );
};

export default BrowseClasses;

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
