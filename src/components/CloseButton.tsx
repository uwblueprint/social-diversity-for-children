import React from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { Link, LinkProps } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const CloseButton: React.FC<LinkProps> = (props) => {
    const router = useRouter();
    const onClick = props.onClick ? props.onClick : () => router.back();

    return (
        <Link onClick={onClick} {...props}>
            <CloseIcon />
        </Link>
    );
};
