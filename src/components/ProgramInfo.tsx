import { Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import Wrapper from "@components/SDCWrapper";
import { BackButton } from "@components/BackButton";
import { Button } from "@chakra-ui/react";
import { ClassList } from "src/components/ClassList";
import type { ClassCardInfo } from "models/Class";
import { ProgramCardInfo } from "models/Program";
import React from "react";
import { SDCBadge } from "./SDCBadge";
import convertToShortDateRange from "@utils/convertToShortDateRange";
import { locale } from "@prisma/client";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

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
};

/**
 * Displays the information of all classes associated with the program id
 */
export const ProgramInfo: React.FC<ProgramDetailsProps> = ({
    session,
    programInfo,
    classInfo,
}): JSX.Element => {
    const router = useRouter();
    const { t } = useTranslation("common");

    return (
        <Wrapper session={session}>
            <BackButton />
            <Flex direction="column" pt={4} pb={8}>
                <Flex align="center">
                    <Heading>{programInfo.name}</Heading>
                    <Spacer />
                    <SDCBadge children={programInfo.onlineFormat} />
                    <SDCBadge ml="2" children={programInfo.tag} />
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
                <Text mt="5">{programInfo.description}</Text>
                <Flex mt="5" align="center">
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
                <ClassList
                    classInfo={classInfo}
                    onlineFormat={programInfo.onlineFormat}
                    tag={programInfo.tag}
                    session={session}
                />
            </Flex>
        </Wrapper>
    );
};
