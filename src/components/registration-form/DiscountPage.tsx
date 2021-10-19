import React from "react";
import { Box, Text, Heading, Stack, Button, Link } from "@chakra-ui/react";
import colourTheme from "@styles/colours";

const FormButton = (props) => {
    return (
        <Button
            bg={colourTheme.colors.Blue}
            alignSelf="flex-start"
            color={"white"}
            fontWeight="400"
            onClick={props.onClick}
            my={8}
            px={12}
            borderRadius="6px"
        >
            {props.children}
        </Button>
    );
};

type DiscountPageProps = {
    styleProps?: Record<string, unknown>;
    onNext: () => void;
    setUpdateProofOfIncome: any;
};

export const DiscountPage: React.FC<DiscountPageProps> = ({
    onNext,
    setUpdateProofOfIncome,
}): JSX.Element => {
    return (
        <>
            <Box maxW="55rem">
                <Stack spacing={8}>
                    <Text fontWeight="700" fontSize="36px" marginTop="39px">
                        Proof of Income
                    </Text>
                    <Heading fontSize="22px" fontWeight="900">
                        You have qualified for an income based discount!
                    </Heading>
                    <Text>
                        From the Proof of Income on your account, you qualify
                        for a discount that will be automatically applied to
                        your total.
                    </Text>
                    <Heading fontSize="22px" fontWeight="900">
                        Has your income changed?
                    </Heading>
                    <Button
                        variant="ghost"
                        as="u"
                        onClick={() => {
                            setUpdateProofOfIncome(true);
                        }}
                        // borderRadius="6px"
                        alignSelf="flex-start"
                        alignItems="flex-start"
                        paddingLeft="0"
                    >
                        Update income
                    </Button>
                    <FormButton
                        onClick={() => {
                            // setPageNum((prevPage) => prevPage + 1);
                        }}
                    >
                        Next
                    </FormButton>
                </Stack>
            </Box>
        </>
    );
};
