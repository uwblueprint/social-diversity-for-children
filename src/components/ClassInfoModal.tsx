import React from "react";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Text,
    AspectRatio,
    Box,
    Grid,
    GridItem,
    ModalCloseButton,
    ModalHeader,
    Image,
} from "@chakra-ui/react";
import { SDCBadge } from "./SDCBadge";
import { ClassCardInfo } from "@models/Class";
import weekdayToString from "@utils/weekdayToString";
import convertToShortTimeRange from "@utils/convertToShortTimeRange";
import colourTheme from "@styles/colours";
import convertToShortDateRange from "@utils/convertToShortDateRange";
import { createWaitlistRegistration } from "@utils/createWaitlistRegistration";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { locale, roles } from "@prisma/client";
import { UseMeResponse } from "@utils/useMe";

type ClassInfoModalProps = {
    isOpen: boolean;
    onClose: () => void;
    classInfo: ClassCardInfo;
    onlineFormat: string;
    tag: string;
    me?: UseMeResponse["me"];
    isFull: boolean;
};

/**
 * Modal for class registration
 * @param isOpen a boolean from the useDisclosure hook
 * @param onClose a method from the useDisclosure hook
 * @param classInfo info about the class
 * @param onlineFormat whether program is online
 * @param tag category of program
 * @param session current user session
 * @returns a modal component allowing user to register in class
 */
export const ClassInfoModal: React.FC<ClassInfoModalProps> = ({
    isOpen,
    onClose,
    classInfo,
    onlineFormat,
    tag,
    me,
    isFull,
}) => {
    const router = useRouter();
    const { t } = useTranslation("common");

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent minH={80} minW={550} p={10}>
                <ModalBody>
                    <ModalHeader textAlign={"left"} px={0}>
                        {classInfo.name}
                    </ModalHeader>
                    <ModalCloseButton />
                    <Text as="span" color="gray.600" fontSize="sm" mt="5">
                        {t("time.range", {
                            ...convertToShortDateRange(
                                classInfo.startDate,
                                classInfo.endDate,
                                router.locale as locale,
                            ),
                        })}
                    </Text>
                    <Box my={25}>
                        <SDCBadge children={onlineFormat} />
                        <SDCBadge children={tag} ml={2} />
                    </Box>
                    <Text>{classInfo.description}</Text>
                    <Grid
                        templateColumns="repeat(5, 1fr)"
                        gap={6}
                        pt={30}
                        pb={5}
                    >
                        <GridItem colSpan={2}>
                            <AspectRatio width="100%" ratio={1}>
                                <Image
                                    src={classInfo.image}
                                    fit="cover"
                                    alt={classInfo.name}
                                />
                            </AspectRatio>
                        </GridItem>
                        <GridItem colSpan={3}>
                            <Text pb={3} fontWeight={"bold"}>
                                {t("program.classDetails")}
                            </Text>
                            <Text pb={1}>{classInfo.name}</Text>
                            <Text pb={1}>
                                {t("time.weekday_many", {
                                    day: weekdayToString(
                                        classInfo.weekday,
                                        router.locale as locale,
                                    ),
                                })}{" "}
                                {convertToShortTimeRange(
                                    classInfo.startTimeMinutes,
                                    classInfo.durationMinutes,
                                )}
                            </Text>
                            {/* TODO: make dynamic */}
                            <Text pb={1}>
                                {t(
                                    classInfo.isAgeMinimal
                                        ? "program.ageGroupAbove"
                                        : "program.ageGroupUnder",
                                    {
                                        age: classInfo.borderAge,
                                    },
                                )}
                            </Text>
                            <Text pb={1}>
                                {t("program.teacherName", {
                                    name: classInfo.teacherName,
                                })}
                            </Text>
                        </GridItem>
                    </Grid>
                </ModalBody>

                <ModalFooter>
                    {isFull ? (
                        <ModalBody>
                            <Button
                                bg={colourTheme.colors.Blue}
                                color={"white"}
                                mx={"auto"}
                                my={2}
                                fontWeight={"200"}
                                _hover={{
                                    textDecoration: "none",
                                    bg: colourTheme.colors.LightBlue,
                                }}
                                _active={{
                                    bg: "lightgrey",
                                    outlineColor: "grey",
                                    border: "grey",
                                    boxShadow: "lightgrey",
                                }}
                                _focus={{
                                    outlineColor: "grey",
                                    border: "grey",
                                    boxShadow: "lightgrey",
                                }}
                                minW={"100%"}
                                onClick={() =>
                                    createWaitlistRegistration(
                                        me.parent,
                                        classInfo.id,
                                    )
                                }
                            >
                                Add to Waitlist
                            </Button>
                            <Text fontSize="sm" align="center">
                                We'll notify you once space becomes available
                            </Text>
                        </ModalBody>
                    ) : (
                        <Link
                            href={
                                me
                                    ? me.role === roles.VOLUNTEER
                                        ? `/volunteer/enrollment?classId=${classInfo.id}`
                                        : `/parent/enrollment/?classId=${classInfo.id}`
                                    : "/login"
                            }
                        >
                            <Button
                                bg={colourTheme.colors.Blue}
                                color={"white"}
                                mx={"auto"}
                                my={2}
                                fontWeight={"200"}
                                _hover={{
                                    textDecoration: "none",
                                    bg: colourTheme.colors.LightBlue,
                                }}
                                _active={{
                                    bg: "lightgrey",
                                    outlineColor: "grey",
                                    border: "grey",
                                    boxShadow: "lightgrey",
                                }}
                                _focus={{
                                    outlineColor: "grey",
                                    border: "grey",
                                    boxShadow: "lightgrey",
                                }}
                                minW={"100%"}
                            >
                                {me
                                    ? "Register"
                                    : t("program.signInToRegister")}
                            </Button>
                        </Link>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
