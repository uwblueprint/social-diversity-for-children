import React from "react";
import {
    Box,
    AspectRatio,
    Image,
    Heading,
    Flex,
    Grid,
    Text,
    GridItem,
    Spacer,
    VStack,
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuDivider,
} from "@chakra-ui/react";
import weekdayToString from "@utils/weekdayToString";
import convertToShortTimeRange from "@utils/convertToShortTimeRange";
import {
    CombinedEnrollmentCardInfo,
    ParentRegistrationInput,
} from "@models/Enroll";
import colourTheme from "@styles/colours";
import convertToShortDateRange from "@utils/convertToShortDateRange";
import { HamburgerIcon } from "@chakra-ui/icons";
import convertToListDisplay from "@utils/convertToListDisplay";
import { StudentCardInfo } from "@models/Student";
import { mutate } from "swr";

type EnrollmentCardProps = {
    enrollmentInfo: CombinedEnrollmentCardInfo;
    isOnlyStudent?: boolean;
};

async function deleteClassRegistrations(
    students: StudentCardInfo[],
    classId: number,
) {
    return students.map((student) => deleteRegistration(student, classId));
}

async function deleteRegistration(student: StudentCardInfo, classId: number) {
    const registrationData: ParentRegistrationInput = {
        classId,
        studentId: student.id,
        parentId: student.parentId,
    };
    const request = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
    };

    const response = await fetch("api/enroll/child", request);
    const deletedRegistration = await response.json();

    mutate("/api/enroll/child");

    return deletedRegistration;
}

/**
 *
 * @param cardInfo info for the program cards on the home page
 * @param onClick method that is called when card is clicked
 * @returns a component that displays the class card info
 */
export const EnrollmentCard: React.FC<EnrollmentCardProps> = ({
    enrollmentInfo,
    isOnlyStudent,
}) => {
    return (
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <GridItem>
                <AspectRatio width="100%" ratio={1}>
                    <Image
                        src={enrollmentInfo.class.image}
                        fit="cover"
                        alt={enrollmentInfo.class.name}
                    />
                </AspectRatio>
            </GridItem>
            <GridItem colSpan={3}>
                <VStack align="left" justify="center" height="100%">
                    <Flex mr="3">
                        <Box>
                            <Heading size="md" pb={4} pr={2}>
                                {enrollmentInfo.program.name} (
                                {enrollmentInfo.class.name})
                            </Heading>
                            <Box as="span" color="gray.600" fontSize="sm">
                                <Text>
                                    {weekdayToString(
                                        enrollmentInfo.class.weekday,
                                    )}
                                    {"s "}
                                    {convertToShortTimeRange(
                                        enrollmentInfo.class.startTimeMinutes,
                                        enrollmentInfo.class.durationMinutes,
                                    )}
                                    {" with Teacher " +
                                        enrollmentInfo.class.teacherName}
                                </Text>
                                <Text>
                                    {convertToShortDateRange(
                                        enrollmentInfo.class.startDate,
                                        enrollmentInfo.class.endDate,
                                    )}
                                </Text>
                            </Box>
                            {isOnlyStudent ? null : (
                                <Text pt={4}>
                                    Participants:{" "}
                                    {convertToListDisplay(
                                        enrollmentInfo.students.map(
                                            (student) => student.firstName,
                                        ),
                                    )}
                                </Text>
                            )}
                        </Box>
                        <Spacer />
                        <Flex alignItems={"baseline"}>
                            <Button
                                bg={colourTheme.colors.Blue}
                                color={"white"}
                                mx={"auto"}
                                my={2}
                                borderRadius={6}
                                onClick={() => alert("Joining Zoom meeting...")}
                                fontWeight={"normal"}
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
                            >
                                Join class
                            </Button>
                            <Menu>
                                <MenuButton
                                    ml={1}
                                    as={IconButton}
                                    aria-label="Options"
                                    icon={<HamburgerIcon />}
                                    outline="none"
                                    bg="white"
                                />
                                <MenuList>
                                    {enrollmentInfo.students.map((student) => (
                                        <>
                                            <MenuItem
                                                key={student.id}
                                                onClick={() =>
                                                    deleteRegistration(
                                                        student,
                                                        enrollmentInfo.classId,
                                                    )
                                                }
                                            >
                                                Unregister for{" "}
                                                {student.firstName}
                                            </MenuItem>
                                            {enrollmentInfo.students.length <
                                            2 ? null : (
                                                <MenuDivider />
                                            )}
                                        </>
                                    ))}
                                    {enrollmentInfo.students.length <
                                    2 ? null : (
                                        <>
                                            <MenuItem
                                                onClick={() =>
                                                    deleteClassRegistrations(
                                                        enrollmentInfo.students,
                                                        enrollmentInfo.classId,
                                                    )
                                                }
                                            >
                                                <Text fontWeight="bold">
                                                    Unregister for all
                                                </Text>
                                            </MenuItem>
                                        </>
                                    )}
                                </MenuList>
                            </Menu>
                        </Flex>
                    </Flex>
                </VStack>
            </GridItem>
        </Grid>
    );
};
