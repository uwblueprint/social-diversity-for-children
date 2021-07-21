import React from "react";
import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/client";

export const SignInButton: React.FC = () => {
    return (
        <>
            <Button
                color={"white"}
                bg={"#0C53A0"}
                px={10}
                mx={8}
                my={1}
                onClick={() => signIn()}
                _hover={{
                    textDecoration: "none",
                    bg: "#2C6AAD",
                }}
                _active={{}}
                fontWeight={"200"}
                borderRadius={100}
            >
                Sign In
            </Button>
        </>
    );
};
