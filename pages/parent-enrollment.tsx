import Wrapper from "@components/SDCWrapper";
import React, { useState } from "react";
import SelectChildForClass from "@components/SelectChildForClass";
import { ClassEnrollmentConfirmation } from "@components/ClassEnrollmentConfirm";
import { Box } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import useUser from "@utils/useUser";
import { useRouter } from "next/router";
import { getSession, GetSessionOptions } from "next-auth/client";
import { Loading } from "@components/Loading";
import { Student } from "@prisma/client";

type ParentEnrollClassProps = {
    session: Record<string, unknown>;
};

/**
 * This is the page that directs a user to register a student for a class
 */

export default function ParentEnrollClass(
    props: ParentEnrollClassProps,
): JSX.Element {
    const [pageNum, setPageNum] = useState<number>(0);
    const [selectedChild, setSelectedChild] = useState<number>(0);
    const { user, isLoading, error } = useUser(props.session.id as string);
    const router = useRouter();

    if (!props.session.role) {
        router.push("/").then(() => window.scrollTo(0, 0)); // Redirect to home if user is not logged in
    }

    if (error) {
        return <Box>{"An error has occurred: " + error.toString()}</Box>;
    }
    if (isLoading) {
        return <Loading></Loading>;
    }
    const parentData = {
        name: user.firstName + " " + user.lastName,
        phone: user.parent.phoneNumber,
    };
    const studentData = user.parent.students;
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
            pageNum={pageNum}
            setPageNum={setPageNum}
        />,
        <ClassEnrollmentConfirmation
            studentData={studentData[selectedChild] as Student}
            parentData={parentData}
            pageNum={pageNum}
            setPageNum={setPageNum}
        />,
    ];
    return <Wrapper>{pageElements[pageNum]}</Wrapper>;
}

/**
 * getServerSideProps gets the session before this page is rendered
 */
export const getServerSideProps: GetServerSideProps = async (
    context: GetSessionOptions,
) => {
    // obtain the next auth session
    const session = await getSession(context);

    return {
        props: { session },
    };
};
