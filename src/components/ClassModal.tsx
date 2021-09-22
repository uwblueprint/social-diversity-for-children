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
import weekdayToString from "@utils/weekdayToString";
import { SDCBadge } from "./SDCBadge";
import { ClassCardInfo } from "@models/Class";
import convertToAmPm from "@utils/convertToAmPm";

type ClassModalProps = {
    isOpen: boolean;
    onClose: () => void;
    classInfo: ClassCardInfo;
    onlineFormat: string;
    tag: string;
};

/**
 * Modal for class registration
 * @param isOpen a boolean from the useDisclosure hook
 * @param onClose a method from the useDisclosure hook
 * @param classInfo info about the class
 * @param onlineFormat whether program is online
 * @param tag category of program
 * @returns a modal component allowing user to register in class
 */
export const ClassModal: React.FC<ClassModalProps> = ({
    isOpen,
    onClose,
    classInfo,
    onlineFormat,
    tag,
}) => {
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
                        {new Date(classInfo.startDate)
                            .toDateString()
                            .split(" ")
                            .slice(1)
                            .join(" ")}{" "}
                        to{" "}
                        {new Date(classInfo.endDate)
                            .toDateString()
                            .split(" ")
                            .slice(1)
                            .join(" ")}
                    </Text>
                    <Box my={25}>
                        <SDCBadge children={onlineFormat} />
                        <SDCBadge children={tag} ml={2} />
                    </Box>
                    <Text>{classInfo.description}</Text>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6} pt={30}>
                        <GridItem>
                            <AspectRatio width="100%" ratio={1}>
                                <Image
                                    src={classInfo.image}
                                    fit="cover"
                                    alt={classInfo.name}
                                />
                            </AspectRatio>
                        </GridItem>
                        <GridItem>
                            <Text fontWeight={"bold"}>Class details</Text>
                            <Text>{classInfo.name}</Text>
                            <Text>
                                {weekdayToString(classInfo.weekday)}
                                {"s "}
                                {convertToAmPm(
                                    classInfo.startTimeMinutes,
                                )} -{" "}
                                {convertToAmPm(
                                    classInfo.startTimeMinutes +
                                        classInfo.durationMinutes,
                                )}
                            </Text>
                            <Text>Ages {classInfo.ageGroup}</Text>
                            <Text>Teacher {classInfo.teacherName}</Text>
                        </GridItem>
                    </Grid>
                </ModalBody>

                <ModalFooter>
                    <Button
                        bg={"#0C53A0"}
                        color={"white"}
                        mx={"auto"}
                        my={2}
                        onClick={onClose}
                        fontWeight={"200"}
                        _hover={{
                            textDecoration: "none",
                            bg: "#2C6AAD",
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
                        Sign in to register/volunteer
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
