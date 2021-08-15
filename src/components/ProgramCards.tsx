import React from "react";
import {
    Box,
    Wrap,
    WrapItem,
    Badge,
    Center,
    AspectRatio,
    Image,
} from "@chakra-ui/react";
import type { ProgramCardInfo } from "models/Program";
import { useSession } from "next-auth/client";
import { programFormat } from "@prisma/client";

export const ProgramList: React.FC<{ cardInfo: ProgramCardInfo[] }> = ({
    cardInfo,
}) => {};
