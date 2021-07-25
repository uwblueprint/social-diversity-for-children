import React from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

type CloseButtonProps = {
    stypeProps?: Record<string, unknown>;
    onClick?: React.MouseEventHandler;
};

export const CloseButton: React.FC<CloseButtonProps> = (props) => {
    const router = useRouter();
    const onClick = props.onClick ? props.onClick : () => router.back();

    return (
        <Link onClick={onClick}>
            <CloseIcon />
        </Link>
    );
};
