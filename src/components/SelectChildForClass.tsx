import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import React, { SetStateAction } from "react";
import colourTheme from "@styles/colours";
import { useTranslation } from "next-i18next";

type SelectChildForClassProps = {
    className: string;
    children: string[];
    eligible: boolean[];
    selectedChild: number;
    setSelectedChild: React.Dispatch<SetStateAction<number>>;
    onNext: () => void;
};

export default function SelectChildForClass(props: SelectChildForClassProps): JSX.Element {
    const { t } = useTranslation("form");
    if (!props.eligible[props.selectedChild]) {
        let index = 0;
        while (!props.eligible[index] && index < props.eligible.length) index++;
        props.setSelectedChild(index);
    }

    return (
        <Box>
            <Center>
                <Text align="center" mt="15px" fontWeight="700" fontSize="36px">
                    {t("enroll.register")}
                </Text>
            </Center>
            <Center>
                <Text pb="55px" align="center" mt="30px" width="60%">
                    {t("enroll.selectChild")} <b>{props.className}</b>
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
                                    ? colourTheme.colors.CatskillWhite
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
                            border={props.selectedChild === index ? null : "2px solid #E1E1E1"}
                            isDisabled={!props.eligible[index]}
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
                    onClick={props.onNext}
                >
                    {t("form.next")}
                </Button>
            </Center>
        </Box>
    );
}
