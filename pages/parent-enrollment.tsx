import Wrapper from "@components/SDCWrapper";
import useSWR from "swr";
import React, { useState } from "react";
import SelectChildForClass from "@components/SelectChildForClass";
import { ClassEnrollmentConfirmation } from "@components/ClassEnrollmentConfirm";
import { Text, Box } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import { getSession, GetSessionOptions } from "next-auth/client";

type ParentEnrollClassProps = {
    session: Record<string, unknown>;
};

export default function ParentEnrollClass(
    props: ParentEnrollClassProps,
): JSX.Element {
    const [pageNum, setPagNum] = useState<number>(0);
    const [selectedChild, setSelectedChild] = useState<number>(0);

    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data: apiResponse, error } = useSWR(
        `/api/user/${props.session.id}`,
        fetcher,
    );
    if (error) {
        return <Box>{"An error has occurred: " + error.toString()}</Box>;
    }
    if (apiResponse) {
        try {
            const userData = apiResponse.data;
            const parentData = {
                name: userData.firstName + " " + userData.lastName,
                phone: userData.parent.phoneNumber,
            };
            const studentData = userData.parent.students;
            const studentNames = userData.parent.students.map((s) => {
                return `${s.firstName} ${s.lastName}`;
            });
            console.log(userData);
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
        } catch {
            console.log("There was an error");
        }
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
