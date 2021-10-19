import React, { useState } from "react";
import SelectChildForClass from "@components/SelectChildForClass";
import { ClassEnrollmentConfirmation } from "@components/ClassEnrollmentConfirm";
import { Box } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import useUser from "@utils/useUser";
import { useRouter } from "next/router";
import { getSession, GetSessionOptions } from "next-auth/client";
import { Loading } from "@components/Loading";
import { roles, Student } from "@prisma/client";
import { ParentEnrolledFormWrapper } from "@components/registration-form/ParentEnrollFormWrapper";
import { MediaReleaseForm } from "@components/agreement-form/MediaReleaseForm";
import { ParticipantWaiver } from "@components/agreement-form/ParticipantWaiver";
import { TermsAndConditions } from "@components/agreement-form/TermsAndConditions";
import { ProofOfIncomeWrapper } from "@components/registration-form/ProofOfIncomeWrapper";

type ParentEnrollClassProps = {
    session: Record<string, unknown>;
};

/**
 * This is the page that directs a user to register a student for a class
 */
export default function ParentEnrollClass({
    session,
}: ParentEnrollClassProps): JSX.Element {
    const [pageNum, setPageNum] = useState<number>(0);
    const [selectedChild, setSelectedChild] = useState<number>(0);
    const { user, isLoading, error } = useUser(session.id as string);
    const router = useRouter();
    const { urlArg } = router.query;
    const classId = urlArg ? Number(urlArg) : null;

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
        <ProofOfIncomeWrapper
            hasProofOfIncome={user.parent.proofOfIncomeLink !== null}
            isLowIncome={user.parent.isLowIncome}
            onNext={nextPage}
            pageNum={pageNum}
        />,
    ];

    return (
        <ParentEnrolledFormWrapper
            session={session}
            formPages={pageElements}
            pageNum={pageNum}
            setPageNum={setPageNum}
            student={studentData[selectedChild] as Student}
            classId={classId}
        />
    );
}

/**
 * getServerSideProps gets the session before this page is rendered
 */
export const getServerSideProps: GetServerSideProps = async (
    context: GetSessionOptions,
) => {
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
        props: { session },
    };
};
