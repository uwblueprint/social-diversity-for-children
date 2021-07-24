import React from "react";
import { useSession } from "next-auth/client";
import { Navbar } from "./Navbar";
import { Footer, DEFAULT_FOOTER_HEIGHT } from "./Footer";
import { Box } from "@chakra-ui/react";

const SDCWrapper: React.FC = (props): JSX.Element => {
    const [session, loading] = useSession();
    return (
        <Box minHeight={"100vh"} position={"relative"}>
            <Navbar session={session} />
            <Box pb={DEFAULT_FOOTER_HEIGHT}>{props.children}</Box>
            <Footer />
        </Box>
    );
};

export default SDCWrapper;
