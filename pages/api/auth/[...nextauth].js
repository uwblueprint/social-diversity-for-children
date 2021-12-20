import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "@database";
import sendVerificationRequest from "@auth";

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
            // custom email verification request handler
            sendVerificationRequest,
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
        // Redirect to the login.tsx page
        signIn: "/login",
        // On errors, redirect to home
        error: "/",
        // On email verification request, redirect to verify page
        verifyRequest: "/verify",
        newUser: "/signup",
    },
    session: {
        // use JSON web tokens for session handling
        jwt: true,
        // maximum age of an idle session - 30 days
        maxAge: 30 * 24 * 60 * 60,
        // update JWT on each login
        updateAge: 0,
    },
    jwt: {
        // JWT secret used for generating a key
        secret: process.env.JWT_SECRET,
    },
    callbacks: {
        session: async (session, user) => {
            // Attach user id to session
            session.id = user.id;
            // Attach user role to session
            session.role = user.role;
            // Return altered session
            return Promise.resolve(session);
        },
        jwt: async (token, user) => {
            // If user exists, collect user id and assign to token
            user ? ((token.id = user.id), (token.role = user.role)) : null, null;

            // Return altered token
            return Promise.resolve(token);
        },
    },
});
