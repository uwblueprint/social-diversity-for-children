import React from "react";
import Wrapper from "@components/AdminWrapper";
import { Error } from "@components/Error";
import { Session } from "next-auth";

export type AdminErrorProps = {
    session?: Session;
    cause: string;
};

/**
 * Error component for internal/admin page
 */
export const AdminError: React.FC<AdminErrorProps> = ({ session, cause }) => {
    return (
        <Wrapper session={session}>
            <Error cause={cause} />
        </Wrapper>
    );
};
