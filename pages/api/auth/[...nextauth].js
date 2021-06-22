import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "../../../services/database";

export default NextAuth({
    // site URL for authentication redirect
    site: process.env.NEXTAUTH_URL,
    providers: [
        // email provider with magic links
        Providers.Email({
            // AWS SES mail server
            server: process.env.EMAIL_SERVER,
            // email address from which the email is to be sent
            from: process.env.EMAIL_FROM,
            // maximum life of email magic link - 1 hour
            maxAge: 24 * 60,
            // TODO: add custom email handler
        }),
    ],
    // map database adapter to prisma client
    adapter: Adapters.Prisma.Adapter({
        prisma,
        modelMapping: {
            User: "user",
            VerificationRequest: "verificationRequest",
        },
    }),
    pages: {
        // On errors, redirect to home
        error: "/",
        // On email verification request, redirect to verify page
        verifyRequest: "/verify",
    },
    session: {
        // use JSON web tokens for session handling
        jwt: true,
        // maximum age of an idle session - 30 days
        maxAge: 30 * 24 * 60 * 60,
    },
    jwt: {
        // JWT secret used for generating a key
        secret: process.env.JWT_SECRET,
    },
    // TODO: define custom callback functions
});
