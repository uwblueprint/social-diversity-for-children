import React from "react";
import Wrapper from "@components/AdminWrapper";
import { Loading } from "./Loading";
import { Session } from "next-auth";

export type AdminLoadingProps = {
    session?: Session;
};

/**
 * Loading spinner component for admin page
 */
export const AdminLoading: React.FC<AdminLoadingProps> = ({ session }) => {
    return (
        <Wrapper session={session}>
            <Loading />
        </Wrapper>
    );
};
