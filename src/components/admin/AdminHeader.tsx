import React from "react";
import { ReactNode } from "react";
import {
    Box,
    Flex,
    HStack,
    Link,
    Text,
    Button,
    Divider,
    Spacer,
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import colourTheme from "@styles/colours";

type HeaderLinks = {
    name: string;
    url: string;
};

type AdminHeaderProps = {
    styleProps?: Record<string, unknown>;
    headerLinks?: HeaderLinks[];
};

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
                leftIcon={<SmallAddIcon />}
            >
                {children}
            </Button>
        </HStack>
    </Link>
);

/**
 * Displays the Header for admin
 */
export const AdminHeader: React.FC<AdminHeaderProps> = ({
    headerLinks,
    children,
}) => {
    return (
        <>
            <Box bg={"transparent"} px={"50px"} pt={"20px"} mx={"auto"}>
                <Flex>
                    <HStack spacing={8}>
                        <Text
                            fontSize="22px"
                            fontWeight="bold"
                            color={colourTheme.colors.Blue}
                        >
                            {children}
                        </Text>
                    </HStack>
                    <Spacer />
                    <HStack spacing={4}>
                        {!headerLinks
                            ? null
                            : headerLinks.map((linkInfo) => (
                                  <NavLink
                                      key={linkInfo.name}
                                      href={linkInfo.url}
                                  >
                                      {linkInfo.name}
                                  </NavLink>
                              ))}
                    </HStack>
                </Flex>
            </Box>
            <Divider orientation="horizontal" my={6} border="2px" w="99%" />
        </>
    );
};
