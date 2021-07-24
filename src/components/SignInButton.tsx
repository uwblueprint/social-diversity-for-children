import React from "react";
import { Button, Link } from "@chakra-ui/react";

export const SignInButton: React.FC = () => {
    return (
        <Link _hover={{ textDecoration: "none" }} href="/login">
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
        </Link>
    );
};
