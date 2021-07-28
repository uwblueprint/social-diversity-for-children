import Wrapper from "@components/SDCWrapper";
import { Button, Box, Center, Text, Flex } from "@chakra-ui/react";
import { CloseButton } from "@components/CloseButton";
export default function ParentEnrollClass(): JSX.Element {
    return (
        <Wrapper>
            <Box>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <CloseButton />
                </Flex>
            </Box>
        </Wrapper>
    );
}
