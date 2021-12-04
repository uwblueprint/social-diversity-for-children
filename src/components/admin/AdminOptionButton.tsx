import { Button, ButtonProps, Icon, Link } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import React from "react";
import { IconType } from "react-icons";

export type AdminOptionButtonProps = ButtonProps & {
    icon: IconType;
    label: string;
    href?: string;
    isExternal?: boolean;
};

export const AdminOptionButton: React.FC<AdminOptionButtonProps> = ({
    icon,
    label,
    href,
    isExternal,
    ...props
}) => {
    const button = (
        <Link
            isExternal={isExternal}
            href={href && isExternal ? href : undefined}
            textDecoration="none"
            rounded={"md"}
            _active={{}}
            _hover={{}}
        >
            <Button
                border="2px"
                borderColor={colourTheme.colors.Sliver}
                px={8}
                w="244px"
                py="24px"
                backgroundColor="white"
                _active={{}}
                _focus={{}}
                borderRadius={"6px"}
                fontWeight="normal"
                {...props}
            >
                <Icon mr={2} as={icon} />
                {label}
            </Button>
        </Link>
    );

    return href && !isExternal ? <Link href={href}>{button}</Link> : button;
};
