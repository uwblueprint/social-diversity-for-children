import colourTheme from "@styles/colours";
import React, { useState } from "react";
import { Box } from "@chakra-ui/react";

type ConfirmClassEnrollmentProps = {
    styleProps?: Record<string, unknown>;
    onNext: () => void;
};

export const ConfirmClassEnrollment: React.FC<ConfirmClassEnrollmentProps> = ({
    onNext,
}): JSX.Element => {
    return <Box></Box>;
};
