import { Session } from "next-auth";
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const GenerateCriminalCheck = dynamic(() => import("@components/CriminalCheck"), {
    ssr: false,
});

type TestProps = {
    session: Session;
};

export const CriminalCheck: React.FC<TestProps> = (props) => {
    return <GenerateCriminalCheck />;
};

export default CriminalCheck;
