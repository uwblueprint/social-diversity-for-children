import { Session } from "next-auth";
import { Box } from "@chakra-ui/react";
import { GenerateCriminalCheck } from "@components/CriminalCheck";

type TestProps = {
    session: Session;
};

export const Test: React.FC<TestProps> = (props) => {
    return (
        <>
            <Box>Testing</Box>
            <GenerateCriminalCheck></GenerateCriminalCheck>
        </>
    );
};

export default Test;
