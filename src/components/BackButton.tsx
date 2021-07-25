import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

type BackButtonProps = {
    stypeProps?: Record<string, unknown>;
    onClick?: React.MouseEventHandler;
};

export const BackButton: React.FC<BackButtonProps> = (props) => {
    const router = useRouter();
    const onClick = props.onClick ? props.onClick : () => router.back();

    return (
        <Button
            leftIcon={<ArrowBackIcon />}
            colorScheme="black"
            variant="link"
            iconSpacing="20px"
            onClick={onClick}
        >
            Back
        </Button>
    );
};
