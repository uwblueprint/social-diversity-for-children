import React, { useState } from "react";
import { VolunteerEnrolledFormWrapper } from "@components/volunteer-enroll/VolunteerEnrollFormWrapper";
import { MediaReleaseForm } from "@components/agreement-form/MediaReleaseForm";
import { SubmitBackgroundCheckForm } from "@components/volunteer-enroll/SubmitBackgroundCheck";
import { ConfirmClassEnrollment } from "@components/volunteer-enroll/ConfirmClass";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcherWithId from "@utils/fetcherWithId";
import { weekday } from ".prisma/client";
import useMe from "@utils/useMe";
import { Box } from "@chakra-ui/layout";
import { Loading } from "@components/Loading";

type VolunteerEnrollmentProps = {
    session: Record<string, unknown>;
};

/**
 * This is the page that a volunteer will use to enroll into a class in a program
 */
export const VolunteerEnrollment: React.FC<VolunteerEnrollmentProps> = ({
    session,
}: VolunteerEnrollmentProps) => {
    const [pageNum, setPageNum] = useState<number>(0);
    console.log(session);
    const router = useRouter();
    const { classId } = router.query;

    // fetch user info
    const { me, isLoading: isMeLoading } = useMe();

    // TODO: edit the register button to this page with the query

    // fetch classInfo from API
    // can also get program part of the class query
    const { data: classInfoResponse, error: classInfoError } = useSWR(
        ["/api/class/" + classId, classId, router.locale],
        fetcherWithId,
    );

    const isClassInfoLoading = !classInfoResponse && !classInfoError;

    if (isClassInfoLoading || isMeLoading) {
        return <Loading />;
    } else if (classInfoError) {
        return <Box>An Error has occured</Box>;
    }

    const nextPage = () => {
        setPageNum(pageNum + 1);
        window.scrollTo({ top: 0 });
    };

    const classInfo = {
        image: "https://www.gstatic.com/webp/gallery3/2.png",
        name: "Test Class 1",
        ageGroup: "9 and under",
        weekday: weekday.MON,
        startTimeMinutes: 0,
        durationMinutes: 0,
        teacherName: "Brian",
        spaceAvailable: 0,
        id: 2,
        description: "test class",
        spaceTotal: 10,
        volunteerSpaceAvailable: 0,
        volunteerSpaceTotal: 10,
        startDate: new Date("1970-01-01T00:00:00.000Z"),
        endDate: new Date("1970-01-01T00:00:00.000Z"),
        isAgeMinimal: false,
    };

    const pageElements = [
        <SubmitBackgroundCheckForm onNext={nextPage} />,
        <MediaReleaseForm onNext={nextPage} />,
        <ConfirmClassEnrollment
            classInfo={classInfoResponse.data}
            onNext={nextPage}
        />,
    ];

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
