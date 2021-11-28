import React, { useState } from "react";
import { VolunteerEnrolledFormWrapper } from "@components/volunteer-enroll/VolunteerEnrollFormWrapper";
import { MediaReleaseForm } from "@components/agreement-form/MediaReleaseForm";
import { SubmitCriminalCheckForm } from "@components/volunteer-enroll/SubmitCriminalCheck";
import { ConfirmClassEnrollment } from "@components/volunteer-enroll/ConfirmClass";
import { UpdateCriminalCheckForm } from "@components/volunteer-enroll/UpdateCriminalCheck";
import { useRouter } from "next/router";
import useSWR from "swr";
import useMe from "@utils/hooks/useMe";
import { Box } from "@chakra-ui/layout";
import { Loading } from "@components/Loading";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CardInfoUtil from "@utils/cardInfoUtil";
import { locale } from "@prisma/client";
import { useToast } from "@chakra-ui/react";
import { fetcherWithId } from "@utils/fetcher";
import { Session } from "next-auth";

type VolunteerEnrollmentProps = {
    session: Session;
};

/**
 * This is the page that a volunteer will use to enroll into a class in a program
 */
export const VolunteerEnrollment: React.FC<VolunteerEnrollmentProps> = ({
    session,
}: VolunteerEnrollmentProps) => {
    const router = useRouter();
    const { classId, page } = router.query;
    const [pageNum, setPageNum] = useState<number>(
        page ? parseInt(page as string, 10) : 0,
    );
    const { me, isLoading: isMeLoading } = useMe();
    const toast = useToast();

    // fetch classInfo from API
    const { data: classInfoResponse, error: classInfoError } = useSWR(
        ["/api/class/" + classId],
        fetcherWithId,
    );

    const isClassInfoLoading = !classInfoResponse && !classInfoError;

    if (isClassInfoLoading || isMeLoading) {
        return <Loading />;
    } else if (classInfoError) {
        return <Box>An Error has occured</Box>;
    }

    const classInfo = classInfoResponse
        ? CardInfoUtil.getClassCardInfo(
              classInfoResponse.data,
              router.locale as locale,
          )
        : null;

    const nextPage = () => {
        setPageNum(pageNum + 1);
        window.scrollTo({ top: 0 });
    };

    const submitVolunteer = async () => {
        const response = await fetch("/api/enroll/volunteer", {
            method: "POST",
            body: JSON.stringify({
                volunteerId: me.id,
                classId: classInfo.id,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    };
    const pageElements = [
        <MediaReleaseForm onNext={nextPage} />,
        <ConfirmClassEnrollment
            classInfo={classInfo}
            onNext={() => {
                submitVolunteer().then((res) => {
                    if (res.ok === true) {
                        nextPage();
                    } else if (res.ok === false) {
                        router.push("/");
                        toast({
                            title: "Registration failed.",
                            description:
                                "The class is not available for registration at this time.",
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                            position: "top-right",
                            variant: "left-accent",
                        });
                    }
                });
            }}
        />,
    ];

    // render submit page if criminal record not submitted
    // render update criminal check form if expired
    !me.volunteer.criminalRecordCheckLink
        ? pageElements.unshift(
              <SubmitCriminalCheckForm classInfo={classInfo} onNext={nextPage} />,
          )
        : me.volunteer.criminalCheckExpired
        ? pageElements.unshift(
              <UpdateCriminalCheckForm classInfo={classInfo} onNext={nextPage} />,
          )
        : {};

    return (
        <VolunteerEnrolledFormWrapper
            session={session}
            pageNum={pageNum}
            setPageNum={setPageNum}
            formPages={pageElements}
        />
    );
};

export default VolunteerEnrollment;

/**
 * getServerSideProps gets the session before this page is rendered
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    // obtain the next auth session
    const session = await getSession(context);

    return {
        props: {
            session,
            ...(await serverSideTranslations(context.locale, ["common", "form"])),
        },
    };
};
