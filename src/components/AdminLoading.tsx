import React from "react";
import Wrapper from "@components/AdminWrapper";
import { Loading } from "./Loading";

/**
 * Loading spinner component for admin page
 */
export const AdminLoading: React.FC = () => {
    return (
        <Wrapper>
            <Loading />
        </Wrapper>
    );
};
