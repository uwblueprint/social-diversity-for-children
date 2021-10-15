import React from "react";
import { Button, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import colourTheme from "@styles/colours";

export const SignInButton: React.FC = () => {
    return (
        <Link href="/login">
            <ChakraLink _hover={{ textDecoration: "none" }}>
                <Button
                    color={"white"}
                    bg={"#0C53A0"}
                    px={10}
                    mx={8}
                    my={1}
                    _hover={{
                        bg: colourTheme.colors.LightBlue,
                    }}
                    _active={{}}
                    fontWeight={"200"}
                    borderRadius="6px"
                >
                    Sign In
                </Button>
            </ChakraLink>
        </Link>
    );
};
