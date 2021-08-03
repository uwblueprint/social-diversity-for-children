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
import React, { useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";

function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    // Returns one radio card with the child's name. Button changes style when selected
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

export default function ParentEnrollClass(): JSX.Element {
    // Next button is disabled by default, activates when a child is selected
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    function ChildrenButtons() {
        // children to be retrieved from parent enroll endpoint
        const children = ["Christina Ru", "Raewyn Tsai", "Stacy Kwok"];

        //when a radio button in the group is selected, Next button is activated
        const { getRootProps, getRadioProps } = useRadioGroup({
            onChange: () => setIsDisabled(false),
        });

        const group = getRootProps();

        // creates a group of radio buttons using the RadioCard component
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
            <Link href="/" ml="100%">
                <CloseIcon />
            </Link>

            <Center>
                <Text mt="15px" fontWeight="700" fontSize="36px">
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
                <ChildrenButtons />
            </Center>
            <Center mt="45px" mb="200px">
                <Button
                    height="50px"
                    width="340px"
                    borderRadius="6px"
                    background={isDisabled ? "#737373" : "#0C53A0"}
                    fontWeight="normal"
                    textColor="#FFFFFF"
                    fontSize="16px"
                    isDisabled={isDisabled}
                >
                    Next
                </Button>
            </Center>
        </Wrapper>
    );
}
