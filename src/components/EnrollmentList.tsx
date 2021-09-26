import React from "react";
import { Center, List, ListItem } from "@chakra-ui/react";
import { EnrollmentCardInfo } from "@models/Enroll";
import { EnrollmentCard } from "./EnrollmentCard";
import colourTheme from "@styles/colours";
import combineStudentEnrollment from "@utils/combineStudentEnrollment";

type EnrollmentListProps = {
    enrollmentInfo: EnrollmentCardInfo[];
};

export const EnrollmentList: React.FC<EnrollmentListProps> = ({
    enrollmentInfo,
}) => {
    return (
        <Center width="100%">
            <List spacing="5" width="100%">
                {combineStudentEnrollment(enrollmentInfo).map((item, idx) => {
                    return (
                        <ListItem
                            borderColor="gray.200"
                            _hover={{ borderColor: colourTheme.colors.Blue }}
                            borderWidth={2}
                            key={idx}
                        >
                            <EnrollmentCard enrollmentInfo={item} />
                        </ListItem>
                    );
                })}
            </List>
        </Center>
    );
};
