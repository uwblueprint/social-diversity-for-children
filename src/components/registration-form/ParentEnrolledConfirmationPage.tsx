import React from "react";
import { Center, Box, Text, Button, VStack } from "@chakra-ui/react";
import ApprovedIcon from "@components/icons/ApprovedIcon";
import colourTheme from "@styles/colours";
import Link from "next/link";
import { createClassRegistration } from "@utils/createClassRegistration";
import { Student } from "@prisma/client";
import Loading from "@components/Loading";

type ParentEnrolledConfirmationPageProps = {
    student: Student;
    classId: number;
};

export const ParentEnrolledConfirmationPage: React.FC<ParentEnrolledConfirmationPageProps> =
    ({ student, classId }): JSX.Element => {
        const data = createClassRegistration(student, classId);

        if (!data) return <Loading></Loading>;
        return (
            <Center>
                <VStack mt={120} mb={180}>
                    <ApprovedIcon />
                    <Text
                        fontWeight="700"
                        fontSize="24px"
                        align="center"
                        pt={5}
                    >
                        Thank you for registering!
                    </Text>
                    <Text maxW={512} textAlign="center" py={3}>
                        We look forward to see you at our program. Look out for
                        an email from us shortly with more information!
                    </Text>
                    <Link href="/class">
                        <Button
                            bg={"transparent"}
                            borderColor={colourTheme.colors.Blue}
                            borderWidth="2px"
                            borderStyle="solid"
                            px={10}
                            _active={{}}
                            fontWeight={"200"}
                            w="350px"
                            color={colourTheme.colors.Blue}
                        >
                            View upcoming classes
                        </Button>
                    </Link>
                    <Box pt={1} />
                    <Link href="/">
                        <Button
                            color={"white"}
                            bg={colourTheme.colors.Blue}
                            px={10}
                            _hover={{
                                bg: colourTheme.colors.LightBlue,
                            }}
                            _active={{}}
                            fontWeight={"200"}
                            w="350px"
                        >
                            Browse Classes
                        </Button>
                    </Link>
                </VStack>
            </Center>
        );
    };
