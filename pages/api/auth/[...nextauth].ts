import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Email({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
        }),
    ],

    // A database is optional, but required to persist accounts in a database
    database: {
        type: "postgres",
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        ssl: {
            rejectUnauthorized: false,
            sslmode: "require",
        },
    },
});
