import { Flex, Heading, Spacer, Badge, Text } from "@chakra-ui/react";
import Wrapper from "@components/SDCWrapper";
import { BackButton } from "@components/BackButton";
import { Button } from "@chakra-ui/react";
import { ClassList } from "src/components/ClassList";
import type { ClassCardInfo } from "models/Class";
import { ProgramCardInfo } from "models/Program";

/**
 * program/class Info follows the Program/Class CardInfo type
 * session is passed in as a prop to be utilized in the Wrapper component
 */
type ProgramDetailsProps = {
    styleProps?: Record<string, unknown>;
    programInfo: ProgramCardInfo;
    classInfo: ClassCardInfo[];
    session: Record<string, unknown>;
};

/**
 * Displays the classes associated with the program id
 */
export const ProgramInfo: React.FC<ProgramDetailsProps> = ({
    session,
    programInfo,
    classInfo,
}): JSX.Element => {
    return (
        <Wrapper session={session}>
            <BackButton />
            <Flex direction="column" pt={4} pb={8}>
                <Flex align="center">
                    <Heading>{programInfo.name}</Heading>
                    <Spacer />
                    <Badge
                        borderRadius="full"
                        textTransform="capitalize"
                        fontWeight="medium"
                        letterSpacing="wide"
                        backgroundColor="#0C53A0"
                        color="white"
                        pb="1"
                        pt="1.5"
                        px="3"
                    >
                        {programInfo.format}
                    </Badge>
                    <Badge
                        borderRadius="full"
                        textTransform="capitalize"
                        fontWeight="medium"
                        letterSpacing="wide"
                        backgroundColor="#0C53A0"
                        color="white"
                        pb="1"
                        pt="1.5"
                        px="3"
                        ml="2"
                    >
                        {programInfo.tag}
                    </Badge>
                </Flex>
                <Text as="span" color="gray.600" fontSize="sm" mt="5">
                    {programInfo.startDate} to {programInfo.endDate}
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
                <ClassList classInfo={classInfo} />
            </Flex>
        </Wrapper>
    );
};
