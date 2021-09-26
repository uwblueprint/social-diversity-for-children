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
import { CombinedEnrollmentCardInfo } from "@models/Enroll";
import colourTheme from "@styles/colours";
import convertToShortDateRange from "@utils/convertToShortDateRange";
import { HamburgerIcon } from "@chakra-ui/icons";
import convertToListDisplay from "@utils/convertToListDisplay";

type EnrollmentCardProps = {
    enrollmentInfo: CombinedEnrollmentCardInfo;
};

/**
 *
 * @param cardInfo info for the program cards on the home page
 * @param onClick method that is called when card is clicked
 * @returns a component that displays the class card info
 */
export const EnrollmentCard: React.FC<EnrollmentCardProps> = ({
    enrollmentInfo,
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
                            <Heading size="md" pb={4}>
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
                            <Text pt={4}>
                                Participants:{" "}
                                {convertToListDisplay(
                                    enrollmentInfo.students.map(
                                        (student) => student.firstName,
                                    ),
                                )}
                            </Text>
                        </Box>
                        <Spacer />
                        <Box>
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
                                        <MenuItem key={student.id}>
                                            Unregister for {student.firstName}
                                        </MenuItem>
                                    ))}
                                    <MenuDivider />
                                    <MenuItem>
                                        <Text fontWeight="bold">
                                            Unregister for all
                                        </Text>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Box>
                    </Flex>
                </VStack>
            </GridItem>
        </Grid>
    );
};
