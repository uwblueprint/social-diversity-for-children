import { Stack, Button } from "@chakra-ui/react";
import { useState } from "react";
import colourTheme from "@styles/colours";
import { VolunteerEnrolledFormWrapper } from "@components/volunteer-enroll/VolunteerEnrollFormWrapper";
import { MediaReleaseForm } from "@components/agreement-form/MediaReleaseForm";
import { SubmitBackgroundCheckForm } from "@components/volunteer-enroll/SubmitBackgroundCheck";

/**
 * This is the page that a volunteer will use to enroll into a class in a program
 */
export default function VolunteerEnroll({
    session,
}: {
    session: Record<string, unknown>;
}): JSX.Element {
    const [pageNum, setPageNum] = useState<number>(0);

    const nextPage = () => {
        setPageNum(pageNum + 1);
        window.scrollTo({ top: 0 });
    };

    const pageElements = [
        <SubmitBackgroundCheckForm onNext={nextPage} />,
        <MediaReleaseForm onNext={nextPage} />,
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
