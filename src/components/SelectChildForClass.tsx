import { Flex, Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import React, { SetStateAction } from "react";
import { CloseButton } from "@components/CloseButton";
import colourTheme from "@styles/colours";

type SelectChildForClassProps = {
    children: string[];
    selectedChild: number;
    setSelectedChild: React.Dispatch<SetStateAction<number>>;
    pageNum: number;
    setPageNum: React.Dispatch<SetStateAction<number>>;
};

export default function SelectChildForClass(
    props: SelectChildForClassProps,
): JSX.Element {
    return (
        <Box>
            <Flex justifyContent="flex-end">
                {/* navigate to browse programs page instead of going back */}
                <CloseButton href="/" />
            </Flex>
            <Center>
                <Text align="center" mt="15px" fontWeight="700" fontSize="36px">
                    Program Registration
                </Text>
            </Center>
            <Center>
                <Text pb="55px" align="center" mt="30px">
                    Who would you like to register for{" "}
                    <b>
                        Building Bridges with Music - <br />
                        Singing Monkeys (Ages 9 and under)?{" "}
                    </b>
                    (select one)
                </Text>
            </Center>

            <Center>
                <VStack spacing={5}>
                    {props.children.map((childName, index) => (
                        <Button
                            _focus={{ boxShadow: null }}
                            _hover={{
                                border: `2px solid ${colourTheme.colors.Blue} `,
                            }}
                            backgroundColor={
                                props.selectedChild === index
                                    ? colourTheme.colors.LightGrayBlue
                                    : "white"
                            }
                            lineHeight="24px"
                            fontSize="16px"
                            fontWeight="normal"
                            textColor={colourTheme.colors.Blue}
                            borderRadius="6px"
                            height="50px"
                            width="340px"
                            key={childName}
                            onClick={() => {
                                props.setSelectedChild(index);
                            }}
                            border={
                                props.selectedChild === index
                                    ? null
                                    : "2px solid #E1E1E1"
                            }
                        >
                            {childName}
                        </Button>
                    ))}
                </VStack>
            </Center>
            <Center mt="45px" mb="200px">
                <Button
                    height="50px"
                    width="340px"
                    borderRadius="6px"
                    background={colourTheme.colors.Blue}
                    fontWeight="normal"
                    textColor="#FFFFFF"
                    fontSize="16px"
                    onClick={() => {
                        props.setPageNum(props.pageNum + 1);
                    }}
                >
                    Next
                </Button>
            </Center>
        </Box>
    );
}
