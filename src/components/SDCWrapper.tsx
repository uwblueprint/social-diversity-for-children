import React from "react";
import { Navbar } from "./Navbar";
import { Footer, DEFAULT_FOOTER_HEIGHT } from "./Footer";
import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";

type SDCWrapperProps = {
    session?: Session;
};

const SDCWrapper: React.FC<SDCWrapperProps> = (props): JSX.Element => {
    return (
        <Box minHeight={"100vh"} position={"relative"}>
            <Navbar session={props.session} />
            <Box pb={DEFAULT_FOOTER_HEIGHT} px={{ base: 6, md: 12, lg: 48 }}>
                {props.children}
            </Box>
            <Footer />
        </Box>
    );
};

export default SDCWrapper;
