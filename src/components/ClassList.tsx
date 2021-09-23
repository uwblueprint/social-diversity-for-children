import React from "react";
import { Center, List, ListItem, useDisclosure } from "@chakra-ui/react";
import type { ClassCardInfo } from "models/Class";
import { ClassModal } from "./ClassModal";
import { ClassCard } from "./ClassCard";
import { InlegibleClassModal } from "./InlegibleClassModal";

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
    return (
        <Center width="100%">
            <List spacing="5" width="100%">
                {classInfo.map((item, idx) => {
                    const { isOpen, onOpen, onClose } = useDisclosure();
                    // TODO: This should depend on whether user is legible for class
                    // This determines which model to display on program card click
                    const legible = true;

                    return (
                        <>
                            <ListItem
                                borderColor="gray.200"
                                _hover={{ borderColor: "#0C53A0" }}
                                borderWidth={2}
                                key={idx}
                            >
                                <ClassCard cardInfo={item} onClick={onOpen} />
                            </ListItem>

                            {legible ? (
                                <ClassModal
                                    isOpen={isOpen}
                                    onClose={onClose}
                                    classInfo={item}
                                    onlineFormat={onlineFormat}
                                    tag={tag}
                                    session={session}
                                />
                            ) : (
                                <InlegibleClassModal
                                    isOpen={isOpen}
                                    onClose={onClose}
                                />
                            )}
                        </>
                    );
                })}
            </List>
        </Center>
    );
};
