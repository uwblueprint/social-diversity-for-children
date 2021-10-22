import React from "react";
import { Box, Button, VStack } from "@chakra-ui/react";
import colourTheme from "@styles/colours";
import { SdcLogoWhite } from "./icons";

type SDCWrapperProps = {
    session?: Record<string, unknown>;
};

const AdminWrapper: React.FC<SDCWrapperProps> = (props): JSX.Element => {
    return (
        <Box minHeight={"100vh"} position={"relative"}>
            <Box
                position="fixed"
                left={0}
                p={5}
                w={275}
                top={0}
                h="100%"
                bg="#dfdfdf"
                bgColor={colourTheme.colors.Blue}
            >
                <SdcLogoWhite />
                <VStack spacing={5} mt={12} alignItems="flex-start">
                    {/* TODO: Make each of these components that takes a link and
                    icon and text */}
                    <Button variant="link">Dashboard</Button>
                    <Button variant="link">Programs</Button>
                    <Button variant="link">Registrants</Button>
                    <Button variant="link">Coupons</Button>
                    <Button variant="link">Archived</Button>
                </VStack>
                <VStack mt={40} spacing={5} alignItems="flex-start">
                    <Button variant="link">Settings</Button>
                    <Button variant="link">Log Out</Button>
                </VStack>
            </Box>
            <Box ml={275}>hello world!!</Box>
        </Box>
    );
};

export default AdminWrapper;
