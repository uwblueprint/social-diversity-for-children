import Wrapper from "@components/SDCWrapper";
import {
    Link,
    Box,
    Button,
    Stack,
    Center,
    Text,
    useRadio,
    useRadioGroup,
} from "@chakra-ui/react";
import { CloseButton } from "@components/CloseButton";
import React from "react";
export default function ParentEnrollClass(): JSX.Element {
    // TODO: Update to retrieve children related to parentID
    const children = ["Christina Ru", "Raewyn Tsai", "Stacy Kwok"];
    const registerChildren = [];

    for (const child of children) {
        registerChildren.push(
            <Center>
                <Button
                    mb="25px"
                    height="50px"
                    width="340px"
                    borderRadius="6px"
                    textColor="#0C53A0"
                    fontSize="16px"
                    fontWeight="normal"
                    backgroundColor="white"
                    border="2px solid #E1E1E1"
                >
                    {child}
                </Button>
            </Center>,
        );
    }
    function RadioCard(props) {
        const { getInputProps, getCheckboxProps } = useRadio(props);

        const input = getInputProps();
        const checkbox = getCheckboxProps();

        return (
            <Box as="label">
                <input {...input} />
                <Box
                    {...checkbox}
                    lineHeight="24px"
                    fontSize="16px"
                    fontWeight="normal"
                    textColor="#0C53A0"
                    width="340px"
                    height="50px"
                    border="2px solid #E1E1E1"
                    borderRadius="6px"
                    _checked={{
                        fontWeight: "normal",
                        bg: "white",
                        textColor: "#0C53A0",
                        border: "2px solid #0C53A0",
                    }}
                    textAlign="center"
                    py="13px"
                    my="10px"
                >
                    {props.children}
                </Box>
            </Box>
        );
    }
    function ChildrenButtons() {
        const children = ["Christina Ru", "Raewyn Tsai", "Stacy Kwok"];

        const { getRootProps, getRadioProps } = useRadioGroup({
            name: "framework",
            defaultValue: "react",
        });

        const group = getRootProps();

        return (
            <Stack {...group}>
                {children.map((value) => {
                    const radio = getRadioProps({ value });
                    return (
                        <RadioCard key={value} {...radio}>
                            {value}
                        </RadioCard>
                    );
                })}
            </Stack>
        );
    }
    return (
        <Wrapper>
            <CloseButton ml={"100%"} />

            <Center>
                <Text mt={"15px"} fontWeight={"700"} fontSize={"36px"}>
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

            {/* {registerChildren} */}
            <Center>
                <ChildrenButtons />
            </Center>
            <Center mt="45px" mb="200px">
                <Button
                    height="50px"
                    width="340px"
                    borderRadius="6px"
                    background="#737373"
                    fontWeight="normal"
                    textColor="#FFFFFF"
                    fontSize="16px"
                >
                    {/* Link to the next page in the flow (does not exist yet) */}
                    <Link href="/">Next</Link>
                </Button>
            </Center>
        </Wrapper>
    );
}
