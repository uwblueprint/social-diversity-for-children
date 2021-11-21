import React from "react";
import Wrapper from "@components/AdminWrapper";
import { Error } from "@components/Error";

export type AdminErrorProps = {
    cause: string;
};

/**
 * Error component for internal/admin page
 */
export const AdminError: React.FC<AdminErrorProps> = ({ cause }) => {
    return (
        <Wrapper>
            <Error cause={cause} />
        </Wrapper>
    );
};
