import React, { useState } from "react";
import SelectChildForClass from "@components/SelectChildForClass";
import { ClassEnrollmentConfirmation } from "@components/ClassEnrollmentConfirm";
import { Box } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import useUser from "@utils/useUser";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { Loading } from "@components/Loading";
import { locale, roles, Student } from "@prisma/client";
import { ParentEnrolledFormWrapper } from "@components/registration-form/ParentEnrollFormWrapper";
import { MediaReleaseForm } from "@components/agreement-form/MediaReleaseForm";
import { ParticipantWaiver } from "@components/agreement-form/ParticipantWaiver";
import { TermsAndConditions } from "@components/agreement-form/TermsAndConditions";
import { ProofOfIncomePage } from "@components/registration-form/ProofOfIncomePage";
import { Checkout } from "@components/registration-form/Checkout";
import { DiscountPage } from "@components/registration-form/DiscountPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import fetcherWithId from "@utils/fetcherWithId";
import useSWR from "swr";
import CardInfoUtil from "@utils/cardInfoUtil";
import { pathWithQuery } from "@utils/request/query";

type ParentEnrollClassProps = {
    session: Record<string, unknown>;
};

/**
 * This is the page that directs a user to register a student for a class
 */
export default function ParentEnrollClass({
    session,
}: ParentEnrollClassProps): JSX.Element {
    const [selectedChild, setSelectedChild] = useState<number>(0);
    const { user, isLoading, error } = useUser(session.id as string);
    const router = useRouter();
    const { classId, page, stripe } = router.query;
    const numberClassId = classId ? parseInt(classId as string, 10) : null;
    const numberPage = page ? parseInt(page as string, 10) : null;
    const [pageNum, setPageNum] = useState<number>(page ? numberPage : 0);

    const { data: classInfoResponse, error: classInfoError } = useSWR(
        ["/api/class/" + classId, classId, router.locale],
        fetcherWithId,
    );

    const isClassInfoLoading = !classInfoResponse && !classInfoError;

    if (isClassInfoLoading) {
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

    if (error) {
        return <Box>{"An error has occurred: " + error.toString()}</Box>;
    }
    if (isLoading) {
        return <Loading />;
    }
    if (!isLoading && !classId) {
        router.back();
    }

    // Stop and redirect to home page if user not parent
    if (!user || user.role !== roles.PARENT) {
        router.push("/signup");
        return <Loading />;
    }

    const parentData = {
        name: user.firstName + " " + user.lastName,
        phone: user.parent.phoneNumber,
    };
    const studentData = user.parent.students.map((s) => {
        const replaceDate = new Date(s.dateOfBirth);
        s.dateOfBirth = replaceDate;
        return s;
    });

    const studentNames = studentData.map((s) => {
        return `${s.firstName} ${s.lastName}`;
    });

    if (studentData.length < 1) {
        router.push("/").then(() => window.scrollTo(0, 0)); // Redirect to home if there are no children, this should be updated to a toast in a future sprint
    }

    const pageElements = [
        <SelectChildForClass
            children={studentNames}
            selectedChild={selectedChild}
            setSelectedChild={setSelectedChild}
            onNext={nextPage}
        />,
        <ClassEnrollmentConfirmation
            studentData={studentData[selectedChild] as Student}
            parentData={parentData}
            onNext={nextPage}
        />,
        <MediaReleaseForm onNext={nextPage} />,
        <ParticipantWaiver onNext={nextPage} />,
        <TermsAndConditions onNext={nextPage} />,
    ];

    if (user.parent.isLowIncome) {
        // TODO: In this case, we should know what the coupon is already to be passed...
        pageElements.push(<DiscountPage onNext={nextPage} />);
    } else if (user.parent.proofOfIncomeLink === null) {
        pageElements.push(
            <ProofOfIncomePage
                pageNum={pageNum}
                classId={numberClassId}
                onNext={nextPage}
            />,
        );
    }
    pageElements.push(
        <Checkout
            classInfo={classInfo}
            successPath={pathWithQuery(
                router.asPath,
                "page",
                (pageElements.length + 1).toString(),
            )}
        />,
    );

    return (
        <ParentEnrolledFormWrapper
            session={session}
            formPages={pageElements}
            pageNum={pageNum}
            setPageNum={setPageNum}
            student={studentData[selectedChild] as Student}
            classId={numberClassId}
            stripeSessionId={stripe ? stripe.toString() : undefined}
            classPriceId={classInfo.stripePriceId}
        />
    );
}

/**
 * getServerSideProps gets the session before this page is rendered
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    // obtain the next auth session
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
            ...(await serverSideTranslations(context.locale, [
                "common",
                "form",
                "poi",
            ])),
        },
    };
};
