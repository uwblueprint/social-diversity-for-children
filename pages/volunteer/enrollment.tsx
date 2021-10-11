import { Stack, Button, Box, Center } from "@chakra-ui/react";
import { useState } from "react";
import colourTheme from "@styles/colours";
import { EnrollSuccessPage } from "@components/volunteer-enroll/EnrollSuccess";

const FormButton = (props) => {
    return (
        <Button
            bg={colourTheme.colors.Blue}
            color={"white"}
            fontWeight="400"
            onClick={props.onClick}
            my={8}
            px={12}
            borderRadius={100}
        >
            {props.children}
        </Button>
    );
};

const FormPage = (props) => {
    return <Stack spacing={8}>{props.children}</Stack>;
};

/**
 * This is the page that a volunteer will use to enroll into a class in a program
 */
export default function VolunteerEnroll({
    session,
}: {
    session: Record<string, unknown>;
}): JSX.Element {
    const [pageNum, setPageNum] = useState(0);
    const formButtonOnClick = () => {
        setPageNum((prevPage) => prevPage + 1);
        window.scrollTo({ top: 0 });
    };

    const formPages = [
        // Submit a background check
        <Box>
            Submit
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
        </Box>,
        // Update a background check
        <Box>
            Update
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
        </Box>,
        // media release
        <Box>
            Media
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
        </Box>,
        // confirm program registration
        <Box>
            Finish
            <FormButton onClick={formButtonOnClick}>Next</FormButton>
        </Box>,
    ];
    const totalPages = formPages.length;

    return (
        <EnrollSuccessPage
            session={session}
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPages={totalPages}
            formPages={formPages}
        />
    );
}
