import { Box } from "@chakra-ui/layout";
import { MediaReleaseForm } from "@components/agreement-form/MediaReleaseForm";
import { ParticipantWaiver } from "@components/agreement-form/ParticipantWaiver";
import { TermsAndConditions } from "@components/agreement-form/TermsAndConditions";
import { ClassEnrollmentConfirmation } from "@components/ClassEnrollmentConfirm";
import { CommonError } from "@components/CommonError";
import { CommonLoading } from "@components/CommonLoading";
import { Loading } from "@components/Loading";
import { Checkout } from "@components/registration-form/Checkout";
import { DiscountPage } from "@components/registration-form/DiscountPage";
import { ParentEnrolledFormWrapper } from "@components/registration-form/ParentEnrollFormWrapper";
import { ProofOfIncomePage } from "@components/registration-form/ProofOfIncomePage";
import SelectChildForClass from "@components/SelectChildForClass";
import { locale, roles, Student } from "@prisma/client";
import CardInfoUtil from "@utils/cardInfoUtil";
import { fetcherWithQuery } from "@utils/fetcher";
import useUser from "@utils/hooks/useUser";
import { pathWithQueries } from "@utils/request/query";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import { Session } from "next-auth";
import convertToAge from "@utils/convertToAge";
import { useTranslation } from "next-i18next";
import useParentRegistrations from "@utils/hooks/useParentRegistration";

type ParentEnrollClassProps = {
    session: Session;
};

/**
 * This is the page that directs a user to register a student for a class
 */
export default function ParentEnrollClass({ session }: ParentEnrollClassProps): JSX.Element {
    const router = useRouter();
    const { classId, page, child, stripe } = router.query;
    const { user, isLoading, error } = useUser(session.id.toString());
    const numberClassId = classId ? parseInt(classId as string, 10) : null;
    const numberPage = page ? parseInt(page as string, 10) : null;
    const [pageNum, setPageNum] = useState<number>(page ? numberPage : 0);
    const [selectedChild, setSelectedChild] = useState<number>(
        child ? parseInt(child as string, 10) : 0,
    );

    const { t } = useTranslation("common");

    const { data: classInfoResponse, error: classInfoError } = useSWR(
        ["/api/class/" + classId],
        fetcherWithQuery,
    );

    const {
        enrollments,
        isLoading: isRegistrationsLoading,
        error: registrationsError,
    } = useParentRegistrations(router.locale as locale);

    const isClassInfoLoading = !classInfoResponse && !classInfoError;

    if (classInfoError || registrationsError) {
        return <CommonError session={session} cause="cannot fetch class" />;
    } else if (isClassInfoLoading || isRegistrationsLoading) {
        return <CommonLoading session={session} />;
    }

    const classInfo = classInfoResponse
        ? CardInfoUtil.getClassCardInfo(classInfoResponse.data, router.locale as locale)
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

    const studentEligible = studentData.map((s) => {
        return (
            enrollments.every((enroll) => enroll.student.id !== s.id) &&
            (classInfo.isAgeMinimal
                ? convertToAge(s.dateOfBirth) >= classInfo.borderAge
                : convertToAge(s.dateOfBirth) <= classInfo.borderAge)
        );
    });

    const ageRange = t(classInfo.isAgeMinimal ? "program.ageGroupAbove" : "program.ageGroupUnder", {
        age: classInfo.borderAge,
    });
    const className = `${classInfo.programName} - ${classInfo.name} (${ageRange})? `;

    if (studentData.length < 1) {
        router.push("/").then(() => window.scrollTo(0, 0)); // Redirect to home if there are no children, this should be updated to a toast in a future sprint
    }

    // if no children are elible for program, parent will be redirected back
    const checkEligible = studentEligible.includes(true);

    if (!checkEligible) {
        router.back();
        return <CommonLoading />;
    }

    const pageElements = [
        <SelectChildForClass
            className={className}
            children={studentNames}
            eligible={studentEligible}
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
        pageElements.push(<DiscountPage onNext={nextPage} />);
    } else if (user.parent.proofOfIncomeLink === null) {
        pageElements.push(
            <ProofOfIncomePage pageNum={pageNum} classId={numberClassId} onNext={nextPage} />,
        );
    }
    pageElements.push(
        <Checkout
            classInfo={classInfo}
            successPath={pathWithQueries(router.asPath, [
                { param: "page", value: (pageElements.length + 1).toString() },
                {
                    param: "child",
                    value: selectedChild.toString(),
                },
            ])}
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
            ...(await serverSideTranslations(context.locale, ["common", "form"])),
        },
    };
};
