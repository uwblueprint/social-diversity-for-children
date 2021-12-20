import colourTheme from "@styles/colours";
import React from "react";
import { Button, Box, Text } from "@chakra-ui/react";
import { ClassCardInfo } from "@models/Class";
import { FormClassCard } from "@components/FormClass";
import { useTranslation } from "next-i18next";

type ConfirmClassEnrollmentProps = {
    styleProps?: Record<string, unknown>;
    classInfo: ClassCardInfo;
    onNext: () => void;
};

export const ConfirmClassEnrollment: React.FC<ConfirmClassEnrollmentProps> = ({
    onNext,
    classInfo,
}): JSX.Element => {
    const { t } = useTranslation("form");

    return (
        <>
            <Box>
                <Text align="left" mt="40px" mb="30px" fontWeight="700" fontSize="36px">
                    {t("enroll.confirmVolunteerRegister")}
                </Text>
            </Box>
            <Box>
                <FormClassCard classInfo={classInfo} />
            </Box>

            <Button
                mt="60px"
                mb="60px"
                height="50px"
                width="200px"
                borderRadius="6px"
                fontWeight="normal"
                fontSize="16px"
                color="white"
                background={colourTheme.colors.Blue}
                onClick={() => {
                    onNext();
                }}
            >
                {t("form.finish")}
            </Button>
        </>
    );
};
