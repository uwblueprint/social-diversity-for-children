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
type BrowseClassesProps = {
    session: Record<string, unknown>;
};

export const BrowseClasses: React.FC<BrowseClassesProps> = (props) => {
    const router = useRouter();
    const { programId } = router.query;
    console.log(programId);

    return <Wrapper session={props.session}></Wrapper>;
};

export default BrowseClasses;
