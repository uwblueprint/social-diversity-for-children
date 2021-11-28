import React from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";

export const CloseButton: React.FC<LinkProps> = ({ onClick, href, ...restProps }) => {
    const router = useRouter();
    if (!onClick && !href) {
        onClick = () => router.back();
    }

    const button = (
        <ChakraLink onClick={onClick} {...restProps}>
            <CloseIcon />
        </ChakraLink>
    );

    return href ? (
        <Link href={href}>
            <ChakraLink>
                <CloseIcon />
            </ChakraLink>
        </Link>
    ) : (
        button
    );
};
