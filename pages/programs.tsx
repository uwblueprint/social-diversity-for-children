import React from "react";
import { WelcomeToSDC } from "@components/WelcomeToSDC";
import { ProgramList } from "@components/ProgramList";
import { Box, Flex, Divider, Spacer, Heading } from "@chakra-ui/react";

export const Programs: React.FC = () => {
    return (
        <Flex direction="column" margin="10% 15%">
            <Box>
                <WelcomeToSDC />
            </Box>
            <Spacer />

            <Divider
                orientation="horizontal"
                marginTop="5%"
                marginBottom="5%"
            />
            <Heading fontSize="3xl" marginBottom="5%">
                Browse programs
            </Heading>

            <Box>
                <ProgramList />
            </Box>
        </Flex>
    );
};
export default Programs;
