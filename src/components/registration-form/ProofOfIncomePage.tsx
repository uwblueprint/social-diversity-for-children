import React from "react";
import { useRouter } from "next/router";
import { IncomePage } from "@components/parent-form/IncomePage";
import { Stack, Box, HStack, Text, Button } from "@chakra-ui/react";
import colourTheme from "@styles/colours";

const FormButton = (props) => {
    return (
        <Button
            bg={colourTheme.colors.Blue}
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

const PROOF_OF_INCOME_EXAMPLES = ["Income tax notice", "Paystub", "etc"];

const UPLOADING_PROOF_OF_INCOME = [
    `Navigate to My Account > Proof of Income`,
    `Upload a copy of the result to your SDC account`,
    `Once you’ve submitted your proof of income, keep an eye out for approval status from SDC!`,
    `Upon approval, discounts will automatically applied to your account!
    Check your account for details on the amount of discount you have been approved for`,
];

type ProofOfIncomePageProps = {
    styleProps?: Record<string, unknown>;
    pageNum: number;
    classId: number;
    onNext: () => void;
};

export const ProofOfIncomePage: React.FC<ProofOfIncomePageProps> = ({
    pageNum,
    classId,
    onNext,
}): JSX.Element => {
    const router = useRouter();
    return (
        <>
            <Text fontWeight="700" fontSize="36px" marginTop="39px">
                Submit a Proof of Income
            </Text>
            <Stack spacing={8}>
                <IncomePage
                    UPLOADING_PROOF_OF_INCOME={UPLOADING_PROOF_OF_INCOME}
                    PROOF_OF_INCOME_EXAMPLES={PROOF_OF_INCOME_EXAMPLES}
                />
            </Stack>
            <Box>
                <HStack spacing="24px">
                    <FormButton
                        onClick={() => {
                            router
                                .push(
                                    `/document-upload?type=income-proof&redirect=/parent/enrollment?classId=${classId}%26page=${pageNum}`,
                                )
                                .then(() => window.scrollTo(0, 0));
                        }}
                    >
                        Upload Proof of Income
                    </FormButton>
                    <Button
                        variant="link"
                        color="black"
                        fontWeight={400}
                        _hover={{ color: colourTheme.colors.Gray }}
                        onClick={onNext}
                        borderRadius="6px"
                    >
                        <Text as="u">Skip for Now</Text>
                    </Button>
                </HStack>
            </Box>
        </>
    );
};
