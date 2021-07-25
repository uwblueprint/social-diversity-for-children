import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

type BackButtonProps = {
    stypeProps?: Record<string, unknown>;
    onClick?: React.MouseEventHandler;
};

export const BackButton: React.FC<BackButtonProps> = (props) => {
    const router = useRouter();
    const onClick = props.onClick ? props.onClick : () => router.back();

    return (
        <Link onClick={onClick}>
            <Button
                leftIcon={<ArrowBackIcon />}
                colorScheme="black"
                variant="link"
                iconSpacing="20px"
            >
                Back
            </Button>
        </Link>
    );
};
