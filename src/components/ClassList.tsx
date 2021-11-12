import React from "react";
import { Center, List, ListItem, useDisclosure } from "@chakra-ui/react";
import type { ClassCardInfo } from "models/Class";
import { ClassInfoModal } from "./ClassInfoModal";
import { ClassInfoCard } from "./ClassInfoCard";
import { IneligibleClassModal } from "./IneligibleClassModal";
import colourTheme from "@styles/colours";
import convertToAge from "@utils/convertToAge";
import { roles, Student } from "@prisma/client";
import { UseMeResponse } from "@utils/hooks/useMe";

type ClassListProps = {
    classInfo: ClassCardInfo[];
    onlineFormat: string;
    tag: string;
    students?: Student[] | null;
    me?: UseMeResponse["me"];
};

export const ClassList: React.FC<ClassListProps> = ({
    classInfo,
    onlineFormat,
    tag,
    students,
    me,
}) => {
    return (
        <Center width="100%" pt={4}>
            <List spacing="5" width="100%">
                {classInfo.map((item, idx) => {
                    const isFull =
                        me &&
                        me.role === roles.PARENT &&
                        item.spaceAvailable < 1;
                    const { isOpen, onOpen, onClose } = useDisclosure();
                    let eligible = true;
                    if (me && me.role === roles.PARENT && students !== null) {
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
                                isFull={isFull}
                            />
                            {eligible ? (
                                <ClassInfoModal
                                    isOpen={isOpen}
                                    onClose={onClose}
                                    classInfo={item}
                                    onlineFormat={onlineFormat}
                                    tag={tag}
                                    me={me}
                                    isFull={isFull}
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
