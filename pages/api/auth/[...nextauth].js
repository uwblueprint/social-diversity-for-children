import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import PrismaAdapter from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Email({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
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
});
