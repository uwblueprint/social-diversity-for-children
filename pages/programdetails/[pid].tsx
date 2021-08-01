import { useRouter } from "next/router";
import React from "react";
import { Heading, Flex, Badge, Spacer, Text, Button } from "@chakra-ui/react";
import { ClassList } from "src/components/ClassList";
import Wrapper from "@components/SDCWrapper";
import { useSession } from "next-auth/client";
import { BackButton } from "@components/BackButton";
import useSWR from "swr";

export const ProgramDetails: React.FC = () => {
    const [session, loading] = useSession();
    const router = useRouter();
    const { pid } = router.query;

    const fetchWithId = (url, id) =>
        fetch(`${url}?id=${id}`).then((r) => r.json());
    const { data: classListResponse, error: classListError } = useSWR(
        ["/api/cardinfo/class", pid],
        fetchWithId,
    );
    const { data: programInfoResponse, error: programInfoError } = useSWR(
        ["/api/cardinfo/program", pid],
        fetchWithId,
    );
    if (classListError || programInfoError)
        return (
            <Text>
                An error has occurred.{" "}
                {classListError ? classListError : programInfoError}
            </Text>
        );

    return (
        <Wrapper session={session}>
            <BackButton />
            {programInfoResponse ? (
                <Flex direction="column" pt={4} pb={8}>
                    <Flex align="center">
                        <Heading>{programInfoResponse.data.name}</Heading>
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
                            {programInfoResponse.data.onlineFormat}
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
                            {programInfoResponse.data.tag}
                        </Badge>
                    </Flex>
                    <Text as="span" color="gray.600" fontSize="sm" mt="5">
                        {
                            new Date(programInfoResponse.data.startDate)
                                .toISOString()
                                .split("T")[0]
                        }{" "}
                        to{" "}
                        {
                            new Date(programInfoResponse.data.endDate)
                                .toISOString()
                                .split("T")[0]
                        }
                    </Text>
                    <Text mt="5">{programInfoResponse.data.description}</Text>
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
                    {classListResponse ? (
                        <ClassList classInfo={classListResponse.data} />
                    ) : (
                        <Text>Loading classes</Text>
                    )}
                </Flex>
            ) : (
                <Text>Loading</Text>
            )}
        </Wrapper>
    );
};

export default ProgramDetails;
