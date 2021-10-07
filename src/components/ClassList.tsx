import React from "react";
import { Center, List, ListItem, useDisclosure } from "@chakra-ui/react";
import type { ClassCardInfo } from "models/Class";
import { ClassInfoModal } from "./ClassInfoModal";
import { ClassInfoCard } from "./ClassInfoCard";
import { IneligibleClassModal } from "./IneligibleClassModal";
import colourTheme from "@styles/colours";
import { Student } from "@prisma/client";

type ClassListProps = {
    classInfo: ClassCardInfo[];
    onlineFormat: string;
    tag: string;
    session?: Record<string, unknown>;
};

export const ClassList: React.FC<ClassListProps> = ({
    classInfo,
    onlineFormat,
    tag,
    session,
}) => {
    const students: Student[] = [];

    return (
        <Center width="100%">
            <List spacing="5" width="100%">
                {classInfo.map((item, idx) => {
                    const { isOpen, onOpen, onClose } = useDisclosure();
                    // TODO: This should depend on whether user is legible for class
                    // This determines which model to display on program card click
                    // For each of the class, we want to get this flag via some helper method.,
                    // We do this by getting the min and max of the age range of students
                    // If a class is in union with the range, we are good, it is legible
                    // If not, it is ineligible, should be gray
                    const legible = false;

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
                                isLegible={legible}
                            />
                            {legible ? (
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
