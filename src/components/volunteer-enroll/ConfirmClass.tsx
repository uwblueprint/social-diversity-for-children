import colourTheme from "@styles/colours";
import React, { useState } from "react";
import { Button, Box, Text } from "@chakra-ui/react";
import { VolunteerEnrollmentCard } from "@components/volunteer-enroll/VolunteerEnrollmentCard";
import { ClassCardInfo } from "@models/Class";

type ConfirmClassEnrollmentProps = {
    styleProps?: Record<string, unknown>;
    classInfo: ClassCardInfo;
    onNext: () => void;
};

export const ConfirmClassEnrollment: React.FC<ConfirmClassEnrollmentProps> = ({
    onNext,
    classInfo,
}): JSX.Element => {
    return (
        <>
            <Box>
                <Text
                    align="left"
                    mt="40px"
                    mb="30px"
                    fontWeight="700"
                    fontSize="36px"
                >
                    Confirm Volunteer Registration
                </Text>
            </Box>
            <Box>
                <VolunteerEnrollmentCard classInfo={classInfo} />
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
                Finish
            </Button>
        </>
    );
};
