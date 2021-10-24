import {
    Box,
    Flex,
    HStack,
    Link,
    useColorModeValue,
    Text,
    Button,
    Divider,
} from "@chakra-ui/react";
import Wrapper from "@components/AdminWrapper";
import React from "react";
import { ReactNode } from "react";
import colourTheme from "@styles/colours";
import { SmallAddIcon } from "@chakra-ui/icons";

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
        </Wrapper>
    );
};

export default BrowsePrograms;
