import React from "react";
import Wrapper from "@components/SDCWrapper";
import { Loading } from "./Loading";
import { Session } from "next-auth";

export type CommonLoadingProps = {
    session?: Session;
};

/**
 * Loading spinner component for external page
 */
export const CommonLoading: React.FC<CommonLoadingProps> = ({ session }) => {
    return (
        <Wrapper session={session}>
            <Loading />
        </Wrapper>
    );
};
