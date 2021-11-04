import React from "react";
import { Navbar } from "./Navbar";
import { Footer, DEFAULT_FOOTER_HEIGHT } from "./Footer";
import { Box } from "@chakra-ui/react";

type SDCWrapperProps = {
    session?: Record<string, unknown>;
};

const SDCWrapper: React.FC<SDCWrapperProps> = (props): JSX.Element => {
    return (
        <Box minHeight={"100vh"} position={"relative"}>
            <Navbar session={props.session} />
            <Box
                pb={DEFAULT_FOOTER_HEIGHT}
                px={{ base: "5", md: "15", lg: "48" }}
            >
                {props.children}
            </Box>
            <Footer />
        </Box>
    );
};

export default SDCWrapper;
