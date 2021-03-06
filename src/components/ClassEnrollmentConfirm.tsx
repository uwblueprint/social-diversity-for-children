import React from "react";
import { Box, Button, HStack, VStack, Heading, Text, Stack } from "@chakra-ui/react";
import { Student } from "@prisma/client";
import colourTheme from "@styles/colours";
import parsePhoneNumber from "@utils/parsePhoneNumber";
import parseDate from "@utils/parseDate";
import Link from "next/link";
import { useTranslation } from "react-i18next";

type parentDataType = {
    name: string;
    phone: string;
};

type ClassEnrollmentConfirmationProps = {
    studentData: Student;
    parentData: parentDataType;
    onNext: () => void;
};

const therapyMapping = {
    PHYSIO: "Physiotherapy",
    SPEECH_LANG: "Speech and language therapy",
    OCCUPATIONAL: "Occupational therapy",
    COUNSELLING: "Counselling",
    ART: "Art therapy",
};

export const ClassEnrollmentConfirmation = (
    props: ClassEnrollmentConfirmationProps,
): JSX.Element => {
    const { t } = useTranslation("form");

    return (
        <Box>
            <VStack spacing="45px" alignItems="flex-start">
                <HStack alignSelf="flex-start" mt="15px" fontWeight="700" fontSize="36px">
                    <Heading>
                        {t("enroll.confirmPersonalInformation")}{" "}
                        <Heading color={colourTheme.colors.Blue} as="span">
                            ({props.studentData.firstName} {props.studentData.lastName})
                        </Heading>
                    </Heading>
                </HStack>
                <Text fontWeight="300" fontSize="22px">
                    {t("enroll.hasChange")}
                </Text>
                <VStack alignItems="flex-start" spacing="32px" marginBottom="80px">
                    <Text fontWeight={700} fontSize="24px" marginBottom="-16px">
                        {t("label.generalParticipantInformation")}
                    </Text>
                    <Box>
                        <Text color={colourTheme.colors.Gray} fontSize="14px" marginBottom="6px">
                            {t("label.participantName")}
                        </Text>
                        <Text>
                            {props.studentData.firstName} {props.studentData.lastName}
                        </Text>
                    </Box>
                    <Box>
                        <Text color={colourTheme.colors.Gray} fontSize="14px" marginBottom="6px">
                            {t("label.dateOfBirth")} (YYYY-MM-DD)
                        </Text>
                        <Text>{parseDate(props.studentData.dateOfBirth)}</Text>
                    </Box>
                    <Stack direction={["column", "row"]} spacing="50px">
                        <Box>
                            <Text
                                color={colourTheme.colors.Gray}
                                fontSize="14px"
                                marginBottom="6px"
                            >
                                {t("label.address1")}
                            </Text>
                            <Text>{props.studentData.addressLine1}</Text>
                        </Box>
                        <Box>
                            <Text
                                color={colourTheme.colors.Gray}
                                fontSize="14px"
                                marginBottom="6px"
                            >
                                {t("label.city")}
                            </Text>
                            <Text>{props.studentData.cityName}</Text>
                        </Box>
                        <Box>
                            <Text
                                color={colourTheme.colors.Gray}
                                fontSize="14px"
                                marginBottom="6px"
                            >
                                {t("label.province")}
                            </Text>
                            <Text>{props.studentData.province}</Text>
                        </Box>
                        <Box>
                            <Text
                                color={colourTheme.colors.Gray}
                                fontSize="14px"
                                marginBottom="6px"
                            >
                                {t("label.postalCode")}
                            </Text>
                            <Text>{props.studentData.postalCode}</Text>
                        </Box>
                    </Stack>
                    <Stack direction={["column", "row"]} spacing="50px">
                        <Box>
                            <Text
                                color={colourTheme.colors.Gray}
                                fontSize="14px"
                                marginBottom="6px"
                            >
                                {t("label.school")}
                            </Text>
                            <Text>{props.studentData.school}</Text>
                        </Box>
                        <Box>
                            <Text
                                color={colourTheme.colors.Gray}
                                fontSize="14px"
                                marginBottom="6px"
                            >
                                {t("label.grade")}
                            </Text>
                            <Text>{props.studentData.grade}</Text>
                        </Box>
                    </Stack>
                    <Box>
                        <Text color={colourTheme.colors.Gray} fontSize="14px" marginBottom="6px">
                            {t("label.difficulties")}
                        </Text>
                        <Text>
                            {props.studentData.difficulties.length === 0
                                ? "N/A"
                                : props.studentData.difficulties
                                      .map((s) => {
                                          return (
                                              s.charAt(0).toUpperCase() +
                                              s.slice(1).toLowerCase() +
                                              " disabilities"
                                          );
                                      })
                                      .join(", ")}
                        </Text>
                    </Box>
                    <Box>
                        <Text color={colourTheme.colors.Gray} fontSize="14px" marginBottom="6px">
                            {t("label.specialEducation")}
                        </Text>
                        <Text>{props.studentData.specialEducation ? "Yes" : "No"}</Text>
                    </Box>
                    <Box>
                        <Text color={colourTheme.colors.Gray} fontSize="14px" marginBottom="6px">
                            {t("label.therapy")}
                        </Text>
                        <Text>
                            {props.studentData.therapy.length === 0
                                ? "N/A"
                                : props.studentData.therapy
                                      .map((s) => {
                                          return therapyMapping[s];
                                      })
                                      .join(", ")}
                        </Text>
                    </Box>
                    <Box>
                        <Text color={colourTheme.colors.Gray} fontSize="14px" marginBottom="6px">
                            {t("label.guardianExpectations")}
                        </Text>
                        <Text>
                            {props.studentData.guardianExpectations
                                ? props.studentData.guardianExpectations
                                : "N/A"}
                        </Text>
                    </Box>
                </VStack>
                <VStack alignItems="flex-start" spacing="32px" marginBottom="80px">
                    <Text fontWeight={700} fontSize="24px" marginBottom="-16px">
                        {t("label.guardianInformation")}
                    </Text>
                    <Box>
                        <Text color={colourTheme.colors.Gray} fontSize="14px" marginBottom="6px">
                            {t("label.guardianName")}
                        </Text>
                        <Text>{props.parentData.name}</Text>
                    </Box>
                    <Box>
                        <Text color={colourTheme.colors.Gray} fontSize="14px" marginBottom="6px">
                            {t("label.phone")}
                        </Text>
                        <Text>{parsePhoneNumber(props.parentData.phone)}</Text>
                    </Box>
                </VStack>
                <VStack alignItems="flex-start" spacing="32px" marginBottom="80px">
                    <Text fontWeight={700} fontSize="24px" marginBottom="-16px">
                        {t("label.emergencyContact")}
                    </Text>
                    <Box>
                        <Text color={colourTheme.colors.Gray} fontSize="14px" marginBottom="6px">
                            {t("label.emergencyName")}
                        </Text>
                        <Text>
                            {props.studentData.emergFirstName +
                                " " +
                                props.studentData.emergLastName}
                        </Text>
                    </Box>
                    <Box>
                        <Text color={colourTheme.colors.Gray} fontSize="14px" marginBottom="6px">
                            {t("label.emergencyPhone")}
                        </Text>
                        <Text>{parsePhoneNumber(props.studentData.emergNumber)}</Text>
                    </Box>
                    <Box>
                        <Text color={colourTheme.colors.Gray} fontSize="14px" marginBottom="6px">
                            {t("label.relation")}
                        </Text>
                        <Text>{props.studentData.emergRelationToStudent}</Text>
                    </Box>
                </VStack>
                <VStack alignItems="flex-start" spacing="32px" marginBottom="80px">
                    <Text fontWeight={700} fontSize="24px" marginBottom="-16px">
                        {t("label.healthInformation")}
                    </Text>
                    <Box>
                        <Text color={colourTheme.colors.Gray} fontSize="14px" marginBottom="6px">
                            {t("label.medication")}
                        </Text>
                        <Text>
                            {props.studentData.medication ? props.studentData.medication : "N/A"}
                        </Text>
                    </Box>
                    <Box>
                        <Text color={colourTheme.colors.Gray} fontSize="14px" marginBottom="6px">
                            {t("label.allergies")}
                        </Text>
                        <Text>
                            {props.studentData.allergies ? props.studentData.allergies : "N/A"}
                        </Text>
                    </Box>
                </VStack>
                <Stack
                    direction={{ base: "column", md: "row" }}
                    spacing="50px"
                    paddingBottom="100px"
                >
                    <Button
                        height="49px"
                        width="205px"
                        borderRadius="6px"
                        background={colourTheme.colors.Blue}
                        fontWeight="normal"
                        textColor="#FFFFFF"
                        fontSize="16px"
                        onClick={props.onNext}
                    >
                        {t("form.next")}
                    </Button>
                    <Link href="/myaccounts">
                        <Button
                            height="50px"
                            width="311px"
                            background="#FFFFFF"
                            borderRadius="6px"
                            borderColor={colourTheme.colors.Blue}
                            borderWidth="2px"
                            fontWeight="normal"
                            textColor={colourTheme.colors.Blue}
                            fontSize="16px"
                        >
                            {t("enroll.updateInfo")}
                        </Button>
                    </Link>
                </Stack>
            </VStack>
        </Box>
    );
};
