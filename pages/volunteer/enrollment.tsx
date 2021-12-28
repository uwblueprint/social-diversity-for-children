import { useToast } from "@chakra-ui/react";
import { MediaReleaseForm } from "@components/agreement-form/MediaReleaseForm";
import { CommonError } from "@components/CommonError";
import { CommonLoading } from "@components/CommonLoading";
import { ConfirmClassEnrollment } from "@components/volunteer-enroll/ConfirmClass";
import { SubmitCriminalCheckForm } from "@components/volunteer-enroll/SubmitCriminalCheck";
import { UpdateCriminalCheckForm } from "@components/volunteer-enroll/UpdateCriminalCheck";
import { VolunteerEnrolledFormWrapper } from "@components/volunteer-enroll/VolunteerEnrollFormWrapper";
import { locale } from "@prisma/client";
import CardInfoUtil from "@utils/cardInfoUtil";
import checkExpiry from "@utils/checkExpiry";
import { fetcherWithQuery } from "@utils/fetcher";
import useMe from "@utils/hooks/useMe";
import useVolunteerRegistrations from "@utils/hooks/useVolunteerRegistration";
import { errorToastOptions } from "@utils/toast/options";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";

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
    const [pageNum, setPageNum] = useState<number>(page ? parseInt(page as string, 10) : 0);
    const { me, isLoading: isMeLoading } = useMe();
    const toast = useToast();
    const { t } = useTranslation("common");

    // fetch classInfo from API
    const { data: classInfoResponse, error: classInfoError } = useSWR(
        ["/api/class/" + classId],
        fetcherWithQuery,
    );

    const {
        volunteering,
        isLoading: isVolunteeringLoading,
        error: volunteeringError,
    } = useVolunteerRegistrations(router.locale as locale);

    const isClassInfoLoading = !classInfoResponse && !classInfoError;

    if (classInfoError || volunteeringError) {
        return <CommonError cause="could not load class info" />;
    } else if (isClassInfoLoading || isMeLoading || isVolunteeringLoading) {
        return <CommonLoading />;
    }

    const classInfo = classInfoResponse
        ? CardInfoUtil.getClassCardInfo(classInfoResponse.data, router.locale as locale)
        : null;

    // if volunteer already registered in class, we redirect to the classes page
    if (volunteering.some((reg) => reg.classId === classInfo.id)) {
        router.push("/class");
    }

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
                        toast(
                            errorToastOptions(
                                t("toast.registrationFailed"),
                                t("toast.registrationFailedDesc"),
                            ),
                        );
                    }
                });
            }}
        />,
    ];

    // render submit page if criminal record not submitted
    // render update criminal check form if expired
    !me.volunteer.criminalRecordCheckLink
        ? pageElements.unshift(<SubmitCriminalCheckForm classInfo={classInfo} onNext={nextPage} />)
        : checkExpiry(me.volunteer.criminalCheckSubmittedAt)
        ? pageElements.unshift(<UpdateCriminalCheckForm classInfo={classInfo} onNext={nextPage} />)
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
