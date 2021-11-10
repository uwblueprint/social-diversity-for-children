import { Center, CenterProps, Spinner } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import React from "react";

export type AdminEmptyStateProps = CenterProps & { isLoading?: boolean };

export const AdminEmptyState: React.FC<AdminEmptyStateProps> = ({
    isLoading,
    children,
    ...props
}): JSX.Element => {
    return (
        <Center
            bg={colourTheme.colors.LightGray}
            w="100%"
            py={"40px"}
            px={"64px"}
            color={colourTheme.colors.Gray}
            border="1px"
            borderColor={colourTheme.colors.Sliver}
            {...props}
        >
            {isLoading ? <Spinner /> : children}
        </Center>
    );
};
