import { useState } from "react";
import { VolunteerEnrolledFormWrapper } from "@components/volunteer-enroll/VolunteerEnrollFormWrapper";
import { MediaReleaseForm } from "@components/agreement-form/MediaReleaseForm";
import { SubmitBackgroundCheckForm } from "@components/volunteer-enroll/SubmitBackgroundCheck";
import { ConfirmClassEnrollment } from "@components/volunteer-enroll/ConfirmClass";
import { weekday } from "@prisma/client";
import { useRouter } from "next/router";
/**
 * This is the page that a volunteer will use to enroll into a class in a program
 */
export default function VolunteerEnroll({
    session,
}: {
    session: Record<string, unknown>;
}): JSX.Element {
    const [pageNum, setPageNum] = useState<number>(0);

    const router = useRouter();
    // abstract the query
    const { classId } = router.query;
    console.log(classId);
    // edit the register button to this page with the query

    const nextPage = () => {
        setPageNum(pageNum + 1);
        window.scrollTo({ top: 0 });
    };
    // replace with fetched data
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
    };

    const pageElements = [
        <SubmitBackgroundCheckForm onNext={nextPage} />,
        <MediaReleaseForm onNext={nextPage} />,
        <ConfirmClassEnrollment cardInfo={classInfo} onNext={nextPage} />,
    ];

    return (
        <VolunteerEnrolledFormWrapper
            session={session}
            pageNum={pageNum}
            setPageNum={setPageNum}
            formPages={pageElements}
        />
    );
}
