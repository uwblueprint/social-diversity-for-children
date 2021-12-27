import { Box, Button, Heading, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { IncomePage } from "@components/parent-form/IncomePage";
import colourTheme from "@styles/colours";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";

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
    const { t } = useTranslation("form");
    const isMobileDevice = useBreakpointValue({ base: true, md: false });

    return (
        <>
            <Text fontWeight="700" fontSize="36px" marginTop="39px">
                {t("poi.submitTitle")}
            </Text>
            <Heading fontSize="22px" fontWeight="900" mt="35px">
                {t("poi.missing")}
            </Heading>
            <br />
            <Stack spacing={8}>
                <IncomePage />
            </Stack>
            <Box>
                <Stack
                    mb={{ base: "20px", md: undefined }}
                    direction={{ base: "column", md: "row" }}
                    alignItems={{ base: undefined, md: "center" }}
                >
                    <FormButton
                        onClick={() => {
                            router
                                .push(
                                    `/document-upload?type=income-proof&redirect=/parent/enrollment?classId=${classId}%26page=${pageNum}`,
                                )
                                .then(() => window.scrollTo(0, 0));
                        }}
                    >
                        {t("poi.upload")}
                    </FormButton>
                    <Button
                        variant={isMobileDevice ? "solid" : "link"}
                        color="black"
                        fontWeight={400}
                        _hover={{ color: colourTheme.colors.Gray }}
                        onClick={onNext}
                        borderRadius="6px"
                        pl={!isMobileDevice ? "20px" : undefined}
                    >
                        <Text as={isMobileDevice ? undefined : "u"}>{t("form.skip")}</Text>
                    </Button>
                </Stack>
            </Box>
        </>
    );
};
