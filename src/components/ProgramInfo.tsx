import { Flex, Heading, Spacer, Badge, Text } from "@chakra-ui/react";

interface ProgramDetailsProps {
    styleProps?: Record<string, unknown>;
    programInfo: ProgramInfoType;
}

type ProgramInfoType = {
    name: string;
    description: string;
    image: string;
    startDate: string;
    endDate: string;
    tag: string;
    format: string;
};

export const ProgramInfo: React.FC<ProgramDetailsProps> = ({
    programInfo,
}): JSX.Element => {
    return <Text>{programInfo.name}</Text>;
};
