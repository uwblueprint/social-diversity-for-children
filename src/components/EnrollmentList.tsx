import React from "react";
import {
    Center,
    Heading,
    List,
    ListItem,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from "@chakra-ui/react";
import { EnrollmentCardInfo } from "@models/Enroll";
import { EnrollmentCard } from "./EnrollmentCard";
import colourTheme from "@styles/colours";
import combineStudentEnrollment from "@utils/combineStudentEnrollment";
import useParentRegistrations from "@utils/useParentRegistration";
import { locale, Student } from "@prisma/client";
import { Loading } from "./Loading";
import { useRouter } from "next/router";
import { EmptyState } from "./EmptyState";

type EnrollmentCardsProps = {
    enrollmentInfo: EnrollmentCardInfo[];
    isOnlyStudent?: boolean;
};

const EnrollmentCards: React.FC<EnrollmentCardsProps> = ({
    enrollmentInfo,
    isOnlyStudent,
}) => {
    return (
        <Center width="100%">
            {enrollmentInfo.length === 0 ? (
                <EmptyState>
                    Currently you have not registered in any classes. <br />
                    Any classes you registered for will show up here!
                </EmptyState>
            ) : (
                <List spacing="5" width="100%">
                    {combineStudentEnrollment(enrollmentInfo).map((item) => {
                        return (
                            <ListItem
                                borderColor="gray.200"
                                _hover={{
                                    borderColor: colourTheme.colors.Blue,
                                }}
                                borderWidth={2}
                                key={item.classId}
                            >
                                <EnrollmentCard
                                    isOnlyStudent={isOnlyStudent}
                                    enrollmentInfo={item}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            )}
        </Center>
    );
};

/**
 * EnrollmentList is a list containing enrollment cards
 * @param enrollmentInfo info of enrollment card
 * @param isOnlyStudent if this card has multiple different children in it
 * @returns a component that displays a list of enrollment card info with tabs
 */
export const EnrollmentList: React.FC = () => {
    const router = useRouter();
    const { enrollments, error, isLoading } = useParentRegistrations(
        router.locale as locale,
    );

    if (error) {
        return (
            // This should really route to some error page instead
            <Text>An error has occurred. {error.toString()}</Text>
        );
    }

    if (isLoading) {
        return <Loading />;
    }

    const students: Array<Student> = [];
    enrollments.forEach((info) => {
        if (
            students.findIndex((student) => student.id === info.student.id) ===
            -1
        ) {
            students.push(info.student);
        }
    });

    if (students.length > 1) {
        return (
            <Tabs>
                <TabList mb={9}>
                    <Tab>All</Tab>
                    {students.map((student) => {
                        return <Tab key={student.id}>{student.firstName}</Tab>;
                    })}
                </TabList>
                <Heading mb={2} size="sm">
                    Upcoming classes
                </Heading>

                <TabPanels>
                    <TabPanel>
                        <EnrollmentCards enrollmentInfo={enrollments} />
                    </TabPanel>
                    {students.map((student) => {
                        return (
                            <TabPanel key={student.id}>
                                <EnrollmentCards
                                    enrollmentInfo={enrollments.filter(
                                        (info) => info.student.id == student.id,
                                    )}
                                />
                            </TabPanel>
                        );
                    })}
                </TabPanels>
            </Tabs>
        );
    } else {
        return (
            <>
                <Heading mb={2} size="sm">
                    Upcoming classes
                </Heading>
                <EnrollmentCards isOnlyStudent enrollmentInfo={enrollments} />
            </>
        );
    }
};
