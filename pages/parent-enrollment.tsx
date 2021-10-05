import Wrapper from "@components/SDCWrapper";
import React, { useState } from "react";
import SelectChildForClass from "@components/SelectChildForClass";
import { ClassEnrollmentConfirmation } from "@components/ClassEnrollmentConfirm";
import { Box } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import useUser from "@utils/useUser";
import { getSession, GetSessionOptions } from "next-auth/client";
import { Loading } from "@components/Loading";

type ParentEnrollClassProps = {
    session: Record<string, unknown>;
};

/**
 * This is the page that a direct a user to register a student for a class
 */

export default function ParentEnrollClass(
    props: ParentEnrollClassProps,
): JSX.Element {
    const [pageNum, setPagNum] = useState<number>(0);
    const [selectedChild, setSelectedChild] = useState<number>(0);
    const { user, isLoading, error } = useUser(props.session.id as string);

    if (error) {
        return <Box>{"An error has occurred: " + error.toString()}</Box>;
    }
    if (isLoading) {
        return <Loading></Loading>;
    }
    if (user) {
        const parentData = {
            name: user.firstName + " " + user.lastName,
            phone: user.parent.phoneNumber,
        };
        const studentData = user.parent.students;
        const studentNames = user.parent.students.map((s) => {
            return `${s.firstName} ${s.lastName}`;
        });
        console.log(studentData.dateOfBirth);
        const pageElements = [
            <SelectChildForClass
                children={studentNames}
                selectedChild={selectedChild}
                setSelectedChild={setSelectedChild}
                pageNum={pageNum}
                setPageNum={setPagNum}
            />,
            <ClassEnrollmentConfirmation
                studentData={studentData[selectedChild]}
                parentData={parentData}
                pageNum={pageNum}
                setPageNum={setPagNum}
            />,
        ];
        return <Wrapper>{pageElements[pageNum]}</Wrapper>;
    }
    return <Box></Box>;
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
