import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { HStack, Button, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const BackButton: React.FC = () => {
    const router = useRouter();

    return (
        <HStack spacing={6} px="48">
            <Link onClick={() => router.back()}>
                <Button
                    leftIcon={<ArrowBackIcon />}
                    colorScheme="black"
                    variant="link"
                    iconSpacing="20px"
                >
                    Back
                </Button>
            </Link>
        </HStack>
    );
};
