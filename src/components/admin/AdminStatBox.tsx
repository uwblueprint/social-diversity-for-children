import { Box, Center, CenterProps, Heading, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import React from "react";

export type AdminStatBoxProps = CenterProps & {
    amount: number;
    label: string;
    isLoading?: boolean;
};

export const AdminStatBox: React.FC<AdminStatBoxProps> = ({
    amount,
    label,
    isLoading,
    ...props
}) => {
    return (
        <Center h={130} w={244} border="1px" borderColor={colourTheme.colors.Sliver} {...props}>
            <Box>
                {isLoading ? <Spinner /> : <Heading>{amount}</Heading>}
                <Text color={colourTheme.colors.Gray}>{label}</Text>
            </Box>
        </Center>
    );
};
