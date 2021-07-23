import React from "react";
import { useSession } from "next-auth/client";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const SDCWrapper: React.FC = (props): JSX.Element => {
    const [session, loading] = useSession();
    return (
        <div>
            <Navbar session={session} />
            {props.children}
            <Footer />
        </div>
    );
};

export default SDCWrapper;
