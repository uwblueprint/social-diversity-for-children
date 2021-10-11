import React from "react";
import { Center, List, ListItem, useDisclosure } from "@chakra-ui/react";
import type { ClassCardInfo } from "models/Class";
import { ClassInfoModal } from "./ClassInfoModal";
import { ClassInfoCard } from "./ClassInfoCard";
import { IneligibleClassModal } from "./IneligibleClassModal";
import colourTheme from "@styles/colours";
import { Student } from "@prisma/client";
import Participants from "@utils/containers/Participants";
import convertToAge from "@utils/convertToAge";

type ClassListProps = {
    classInfo: ClassCardInfo[];
    onlineFormat: string;
    tag: string;
    students?: Student[];
    session?: Record<string, unknown>;
};

export const ClassList: React.FC<ClassListProps> = ({
    classInfo,
    onlineFormat,
    tag,
    session,
}) => {
    const { students } = Participants.useContainer();

    return (
        <Center width="100%">
            <List spacing="5" width="100%">
                {classInfo.map((item, idx) => {
                    const { isOpen, onOpen, onClose } = useDisclosure();
                    let eligible = true;
                    if (students !== null) {
                        eligible = false;
                        eligible = students.some((student) => {
                            const age = convertToAge(
                                new Date(student.dateOfBirth),
                            );
                            if (item.isAgeMinimal && age >= item.borderAge) {
                                return true;
                            } else if (
                                !item.isAgeMinimal &&
                                age <= item.borderAge
                            ) {
                                return true;
                            }
                            return false;
                        });
                    }

                    return (
                        <ListItem
                            borderColor="gray.200"
                            _hover={{ borderColor: colourTheme.colors.Blue }}
                            borderWidth={2}
                            key={idx}
                        >
                            <ClassInfoCard
                                cardInfo={item}
                                onClick={onOpen}
                                isEligible={eligible}
                            />
                            {eligible ? (
                                <ClassInfoModal
                                    isOpen={isOpen}
                                    onClose={onClose}
                                    classInfo={item}
                                    onlineFormat={onlineFormat}
                                    tag={tag}
                                    session={session}
                                />
                            ) : (
                                <IneligibleClassModal
                                    isOpen={isOpen}
                                    onClose={onClose}
                                />
                            )}
                        </ListItem>
                    );
                })}
            </List>
        </Center>
    );
};
