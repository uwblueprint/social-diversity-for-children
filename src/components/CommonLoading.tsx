import React from "react";
import Wrapper from "@components/SDCWrapper";
import { Loading } from "./Loading";

export type CommonLoadingProps = {
    session?: Record<string, unknown>;
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
