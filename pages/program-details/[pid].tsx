import { useRouter } from "next/router";
import React from "react";
import { Box } from "@chakra-ui/react";
import { getSession } from "next-auth/client";
import { ProgramInfo } from "@components/ProgramInfo";
import useSWR from "swr";
import CardInfoUtil from "utils/cardInfoUtil";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { locale } from "@prisma/client";
import { Loading } from "@components/Loading";
import Participants from "@utils/containers/Participants";
import useMe from "@utils/useMe";
import { fetcherWithId } from "@utils/fetcher";

type ProgramDetailsProps = {
    session: Record<string, unknown>;
};

export const ProgramDetails: React.FC<ProgramDetailsProps> = ({
    session,
}: ProgramDetailsProps) => {
    const router = useRouter();
    const { pid } = router.query;

    // No need to handle no user since it's a public page
    const { me, isLoading: isMeLoading } = useMe();

    const { data: classListResponse, error: classListError } = useSWR(
        ["/api/class", pid, router.locale],
        fetcherWithId,
    );
    const isClassListLoading = !classListResponse && !classListError;
    const { data: programInfoResponse, error: programInfoError } = useSWR(
        ["/api/program/" + pid, pid, router.locale],
        fetcherWithId,
    );
    const isProgramInfoLoading = !programInfoResponse && !programInfoError;

    if (isClassListLoading || isProgramInfoLoading || isMeLoading) {
        return <Loading />;
    } else if (classListError || programInfoError) {
        return <Box>An Error has occured</Box>;
    }

    const programCardInfo = programInfoResponse
        ? CardInfoUtil.getProgramCardInfo(
              programInfoResponse.data,
              router.locale as locale,
          )
        : null;
    const classCardInfos = classListResponse
        ? CardInfoUtil.getClassCardInfos(
              classListResponse.data,
              router.locale as locale,
          )
        : [];

    if (!programCardInfo || !classCardInfos) {
        return <Loading />;
    }

    return (
        <Participants.Provider
            initialState={me && me.parent ? me.parent.students : null}
        >
            <ProgramInfo
                session={session}
                programInfo={programCardInfo}
                me={me}
                classInfo={classCardInfos}
            />
        </Participants.Provider>
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
