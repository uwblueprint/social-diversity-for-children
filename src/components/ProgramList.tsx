import React from "react";
import type { ProgramCardInfo } from "models/Program";
import { useSession } from "next-auth/client";
import { ProgramCard } from "@components/ProgramCard";
export const ProgramList: React.FC<{ cardInfo: ProgramCardInfo[] }> = ({
    cardInfo,
}) => {
    const [session] = useSession();

    return <ProgramCard session={session} cardInfo={cardInfo} />;
};
