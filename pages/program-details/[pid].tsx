import { useRouter } from "next/router";
import React from "react";
import { Text, Spinner, Center } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import { ProgramInfo } from "@components/ProgramInfo";
import useSWR from "swr";
import CardInfoUtil from "utils/cardInfoUtil";

export const ProgramDetails: React.FC = () => {
    const [session, loading] = useSession();
    const router = useRouter();
    const { pid } = router.query;

    const fetchWithId = (url, id) =>
        fetch(`${url}?id=${id}`).then((r) => r.json());
    const { data: classListResponse, error: classListError } = useSWR(
        ["/api/class", pid],
        fetchWithId,
    );
    const { data: programInfoResponse, error: programInfoError } = useSWR(
        ["/api/program/" + pid, pid],
        fetchWithId,
    );
    if (classListError || programInfoError) {
        return (
            <Text>
                An error has occurred.{" "}
                {classListError
                    ? classListError.toString()
                    : programInfoError.toString()}
            </Text>
        );
    }
    const programCardInfo = programInfoResponse
        ? CardInfoUtil.getProgramCardInfo(programInfoResponse.data)
        : null;
    const classCardInfos = classListResponse
        ? CardInfoUtil.getClassCardInfos(classListResponse.data)
        : [];

    // if program name in program info, pass in programInfo[programName]
    return programCardInfo && classCardInfos ? (
        <ProgramInfo
            programInfo={programCardInfo}
            session={session}
            classInfo={classCardInfos}
        />
    ) : (
        <Center>
            <Spinner size="xl" />
        </Center>
    );
};

export default ProgramDetails;
