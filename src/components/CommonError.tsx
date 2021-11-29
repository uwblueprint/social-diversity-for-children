import React from "react";
import Wrapper from "@components/SDCWrapper";
import { Error } from "@components/Error";
import { Session } from "next-auth";

export type CommonErrorProps = {
    // Cause of error
    cause: string;
    session?: Session;
};

/**
 * Error component for external pages
 */
export const CommonError: React.FC<CommonErrorProps> = ({ cause, session }) => {
    return (
        <Wrapper session={session}>
            <Error cause={cause} />
        </Wrapper>
    );
};
