import React from "react";
import { Button, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

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
                        bg: "#2C6AAD",
                    }}
                    _active={{}}
                    fontWeight={"200"}
                    borderRadius={100}
                >
                    Sign In
                </Button>
            </ChakraLink>
        </Link>
    );
};
