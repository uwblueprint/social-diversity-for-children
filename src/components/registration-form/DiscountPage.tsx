import React from "react";
import { Box, Text, Heading, Stack, Button, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
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
};

export const DiscountPage: React.FC<DiscountPageProps> = ({
    onNext,
}): JSX.Element => {
    const router = useRouter();
    return (
        <>
            <Box>
                <Stack spacing={8} mb={8}>
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
                        variant="link"
                        color="black"
                        fontWeight={400}
                        _hover={{ color: colourTheme.colors.Gray }}
                        onClick={() => {
                            router.push("/myaccounts");
                        }}
                        alignSelf="flex-start"
                        alignItems="flex-start"
                        paddingLeft="0"
                    >
                        <Text as="u">Update income</Text>
                    </Button>
                    <FormButton onClick={onNext}>Next</FormButton>
                </Stack>
            </Box>
        </>
    );
};
