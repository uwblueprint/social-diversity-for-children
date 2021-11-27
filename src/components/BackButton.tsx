import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

type BackButtonProps = {
    stypeProps?: Record<string, unknown>;
    onClick?: React.MouseEventHandler;
};

export const BackButton: React.FC<BackButtonProps> = (props) => {
    const router = useRouter();
    const { t } = useTranslation("common");

    const onClick = props.onClick ? props.onClick : () => router.back();

    return (
        <Button
            leftIcon={<ArrowBackIcon />}
            colorScheme="black"
            variant="link"
            iconSpacing="20px"
            onClick={onClick}
            _focus={{}}
        >
            {t("nav.back")}
        </Button>
    );
};
