import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import PrismaAdapter from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
    site: process.env.NEXTAUTH_URL,
    providers: [
        Providers.Email({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
            maxAge: 24 * 60,
        }),
    ],
    adapter: PrismaAdapter({
        prisma: prisma,
        modelMapping: {
            User: "user",
            Account: "account",
            Session: "session",
            VerificationRequest: "verificationRequest",
        },
    }),
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 0,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
});
