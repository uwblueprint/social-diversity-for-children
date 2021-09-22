import React from "react";
import { Center, List, ListItem, useDisclosure } from "@chakra-ui/react";
import type { ClassCardInfo } from "models/Class";
import { ClassModal } from "./ClassModal";
import { ClassCard } from "./ClassCard";

export const ClassList: React.FC<{
    classInfo: ClassCardInfo[];
    onlineFormat: string;
    tag: string;
}> = ({ classInfo, onlineFormat, tag }) => {
    return (
        <Center width="100%">
            <List spacing="5" width="100%">
                {classInfo.map((item, idx) => {
                    const { isOpen, onOpen, onClose } = useDisclosure();

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

                            <ClassModal
                                isOpen={isOpen}
                                onClose={onClose}
                                classInfo={item}
                                onlineFormat={onlineFormat}
                                tag={tag}
                            />
                        </>
                    );
                })}
            </List>
        </Center>
    );
};
