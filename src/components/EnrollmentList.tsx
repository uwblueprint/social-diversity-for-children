import React from "react";
import {
    Center,
    List,
    ListItem,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import { EnrollmentCardInfo } from "@models/Enroll";
import { EnrollmentCard } from "./EnrollmentCard";
import colourTheme from "@styles/colours";
import combineStudentEnrollment from "@utils/combineStudentEnrollment";
import { StudentCardInfo } from "@models/Student";

type EnrollmentListProps = {
    enrollmentInfo: EnrollmentCardInfo[];
};

const ListComp: React.FC<EnrollmentListProps> = ({ enrollmentInfo }) => {
    return (
        <Center width="100%">
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
                            <EnrollmentCard enrollmentInfo={item} />
                        </ListItem>
                    );
                })}
            </List>
        </Center>
    );
};

export const EnrollmentList: React.FC<EnrollmentListProps> = ({
    enrollmentInfo,
}) => {
    const students: Array<StudentCardInfo> = [];
    enrollmentInfo.forEach((info) => {
        if (
            students.findIndex((student) => student.id === info.student.id) ===
            -1
        ) {
            students.push(info.student);
        }
    });

    return (
        <Tabs>
            <TabList>
                <Tab>All</Tab>
                {students.map((student) => {
                    return <Tab key={student.id}>{student.firstName}</Tab>;
                })}
            </TabList>

            <TabPanels>
                <TabPanel>
                    <ListComp enrollmentInfo={enrollmentInfo} />
                </TabPanel>
                {students.map((student) => {
                    return (
                        <TabPanel key={student.id}>
                            <ListComp
                                enrollmentInfo={enrollmentInfo.filter(
                                    (info) => info.student.id == student.id,
                                )}
                            />
                        </TabPanel>
                    );
                })}
            </TabPanels>
        </Tabs>
    );
};
