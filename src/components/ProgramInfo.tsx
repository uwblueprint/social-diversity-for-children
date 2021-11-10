import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Flex,
    Heading,
    Spacer,
    Text,
    Box,
    useBreakpointValue,
} from "@chakra-ui/react";
import Wrapper from "@components/SDCWrapper";
import { BackButton } from "@components/BackButton";
import { Button } from "@chakra-ui/react";
import { ClassList } from "src/components/ClassList";
import type { ClassCardInfo } from "models/Class";
import { ProgramCardInfo } from "models/Program";
import React from "react";
import { SDCBadge } from "./SDCBadge";
import convertToShortDateRange from "@utils/convertToShortDateRange";
import { locale, roles } from "@prisma/client";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { EmptyState } from "./EmptyState";
import Participants from "@utils/containers/Participants";
import { UseMeResponse } from "@utils/hooks/useMe";

/**
 * programInfo is the program information that will be displayed on the home page, follows the ProgramCardInfo type
 * classInfo stores class info, where classes are associated with a program, following the ClassCardInfo type
 * session is passed in as a prop to be utilized in the Wrapper component
 */
type ProgramDetailsProps = {
    styleProps?: Record<string, unknown>;
    programInfo: ProgramCardInfo;
    classInfo: ClassCardInfo[];
    session: Record<string, unknown>;
    me: UseMeResponse["me"];
};

/**
 * Displays the information of all classes associated with the program id
 */
export const ProgramInfo: React.FC<ProgramDetailsProps> = ({
    session,
    me,
    programInfo,
    classInfo,
}): JSX.Element => {
    const router = useRouter();
    const { t } = useTranslation("common");
    const { students } = Participants.useContainer();
    const isTagsBesideHeading = useBreakpointValue({ base: false, xl: true });

    let fullClassInfo;
    let availableClassInfo;
    if (me && me.role === roles.VOLUNTEER) {
        fullClassInfo = classInfo.filter(
            (info) => info.volunteerSpaceAvailable === 0,
        );
        availableClassInfo = classInfo.filter(
            (info) => info.volunteerSpaceAvailable !== 0,
        );
    } else {
        fullClassInfo = classInfo.filter((info) => info.spaceAvailable === 0);
        availableClassInfo = classInfo.filter(
            (info) => info.spaceAvailable !== 0,
        );
    }

    const programTags = (
        <Box>
            <SDCBadge children={programInfo.onlineFormat} />
            <SDCBadge ml="2" children={programInfo.tag} />
        </Box>
    );

    return (
        <Wrapper session={session}>
            <BackButton />
            <Flex direction="column" pt={4} pb={8}>
                <Flex align="center">
                    <Heading>{programInfo.name}</Heading>
                    <Spacer />
                    {isTagsBesideHeading ? programTags : null}
                </Flex>
                <Text as="span" color="gray.600" fontSize="sm" mt="5">
                    {t("time.range", {
                        ...convertToShortDateRange(
                            programInfo.startDate,
                            programInfo.endDate,
                            router.locale as locale,
                        ),
                    })}
                </Text>
                <Text my="5">{programInfo.description}</Text>
                {isTagsBesideHeading ? null : programTags}
                <Flex mt={{ base: 5, xl: 0 }} align="center">
                    <Text fontSize="sm" fontWeight="semibold">
                        Select a class
                    </Text>
                    <Spacer />
                    {/* TODO what is the filter button supposed to do? */}
                    <Button
                        fontSize="sm"
                        backgroundColor="transparent"
                        borderColor="gray.600"
                        borderWidth="1"
                    >
                        Filter
                    </Button>
                </Flex>
                {availableClassInfo.length === 0 ? (
                    <EmptyState>
                        There are currently no available classes for{" "}
                        {programInfo.name}.
                        <br />
                        Register for a waitlisted class below or check out
                        another program
                    </EmptyState>
                ) : (
                    <ClassList
                        classInfo={availableClassInfo}
                        onlineFormat={programInfo.onlineFormat}
                        tag={programInfo.tag}
                        students={students}
                        me={me}
                    />
                )}
                {fullClassInfo.length < 1 ? null : (
                    <Accordion allowToggle defaultIndex={0}>
                        <AccordionItem>
                            <Flex
                                pt="70px"
                                align="center"
                                justifyContent="space-between"
                            >
                                <Text fontSize="sm" fontWeight="semibold">
                                    Full classes
                                </Text>
                                <AccordionButton w="min">
                                    <AccordionIcon />
                                </AccordionButton>
                            </Flex>
                            <AccordionPanel p={0}>
                                <ClassList
                                    classInfo={fullClassInfo}
                                    onlineFormat={programInfo.onlineFormat}
                                    tag={programInfo.tag}
                                    students={students}
                                    me={me}
                                />
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                )}
            </Flex>
        </Wrapper>
    );
};
