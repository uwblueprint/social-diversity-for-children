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

// test card info
const cardInfo: ProgramCardInfo = {
    id: 1,
    name: "Building Bridges with Music",
    image: "https://images.squarespace-cdn.com/content/v1/5e83092341f99d6d384777ef/1608341017251-K0Q0U7BC37SQ5BGCV9G0/IMG_6646.jpg?format=750w",
    description: "Test description  ssssss",
    startDate: new Date("2021-10-16T00:33:11.273Z"),
    endDate: new Date("2021-10-23T00:33:11.273Z"),
    onlineFormat: programFormat.online,
    tag: "Music",
    price: 0,
};

export const BrowsePrograms: React.FC<BrowseProgramsProps> = (props) => {
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
            <BrowseProgramCard session={props.session} cardInfo={cardInfo} />
        </Wrapper>
    );
};

export default BrowsePrograms;
