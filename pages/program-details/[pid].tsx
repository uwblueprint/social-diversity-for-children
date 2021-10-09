import { useRouter } from "next/router";
import React from "react";
import { Text, Spinner, Center } from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/client";
import { ProgramInfo } from "@components/ProgramInfo";
import useSWR from "swr";
import CardInfoUtil from "utils/cardInfoUtil";
import fetcherWithId from "@utils/fetcherWithId";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type ProgramDetailsProps = {
    session: Record<string, unknown>;
};

export const ProgramDetails: React.FC<ProgramDetailsProps> = ({
    session,
}: ProgramDetailsProps) => {
    const router = useRouter();
    const { pid } = router.query;

    const { data: classListResponse, error: classListError } = useSWR(
        ["/api/class", pid, router.locale],
        fetcherWithId,
    );
    const { data: programInfoResponse, error: programInfoError } = useSWR(
        ["/api/program/" + pid, pid, router.locale],
        fetcherWithId,
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

/**
 * getServerSideProps gets the session before this page is rendered
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    // obtain the next auth session
    const session = await getSession(context);

    return {
        props: {
            session,
            ...(await serverSideTranslations(context.locale, ["common"])),
        },
    };
};
