import React from "react";
import { Button, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import colourTheme from "@styles/colours";
import { useTranslation } from "next-i18next";

export const SignInButton: React.FC = () => {
    const { t } = useTranslation("common");

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
                    {t("home.signIn")}
                </Button>
            </ChakraLink>
        </Link>
    );
};
