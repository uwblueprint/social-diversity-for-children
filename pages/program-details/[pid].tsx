import { useRouter } from "next/router";
import React from "react";
import { getSession } from "next-auth/client";
import { ProgramInfo } from "@components/ProgramInfo";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { locale } from "@prisma/client";
import { Loading } from "@components/Loading";
import Participants from "@utils/containers/Participants";
import useMe from "@utils/hooks/useMe";
import { CommonError } from "@components/CommonError";
import { CommonLoading } from "@components/CommonLoading";
import { Session } from "next-auth";
import useClassesByProgram from "@utils/hooks/UseClassesByProgram";
import useProgram from "@utils/hooks/useProgram";

type ProgramDetailsProps = {
    session: Session;
};

export const ProgramDetails: React.FC<ProgramDetailsProps> = ({ session }: ProgramDetailsProps) => {
    const router = useRouter();
    const { pid } = router.query;

    // No need to handle no user since it's a public page
    const { me, isLoading: isMeLoading } = useMe();

    const {
        classCards: classCardInfos,
        error: classListError,
        isLoading: isClassListLoading,
    } = useClassesByProgram(pid as string, router.locale as locale);

    const {
        program: programCardInfo,
        error: programInfoError,
        isLoading: isProgramInfoLoading,
    } = useProgram(parseInt(pid as string), router.locale as locale);

    if (classListError || programInfoError) {
        return <CommonError cause="cannot fetch classes" session={session} />;
    } else if (isClassListLoading || isProgramInfoLoading || isMeLoading) {
        return <CommonLoading session={session} />;
    }

    if (!programCardInfo || !classCardInfos) {
        return <Loading />;
    }

    return (
        <Participants.Provider initialState={me && me.parent ? me.parent.students : null}>
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
