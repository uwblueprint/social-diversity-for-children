import React from "react";
import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/client";

export const SignInButton: React.FC = (props) => {
    return (
        <>
            <Button
                color={"white"}
                bg={"#0C53A0"}
                px={10}
                mx={8}
                my={1}
                onClick={() => signIn()}
                // TODO: @designers: what to do when hovering over sign in button?
                _hover={{
                    textDecoration: "none",
                }}
                _active={{}}
            >
                Sign In
            </Button>
        </>
    );
};
