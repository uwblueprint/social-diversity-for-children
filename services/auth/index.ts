import nodemailer from "nodemailer";
import { SendVerificationRequest } from "next-auth/providers";

/**
 * Send email to user to verify the login request, used for NextAuth
 */
const sendVerificationRequest: SendVerificationRequest = ({
    identifier: email,
    url,
    provider: { server, from },
}): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        nodemailer.createTransport(server).sendMail(
            {
                to: email,
                from,
                subject: "Sign in to Social Diversity for Children App",
                text: text(url, email),
                html: html(url, email),
            },
            (error) => {
                return error ? reject(error) : resolve();
            },
        );
    });
};

/**
 * Render html email
 * @param {String} url to redirect
 * @param {String} email of requesting user
 * @returns email html
 */
const html = (url: string, email: string): string => {
    // Collect escaped email (for various email clients that might parse as link)
    const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;

    // Generate html email template
    return `
        <head>
            <link
                href="https://fonts.googleapis.com/css?family=Poppins"
                rel="stylesheet"
            />
            <style>
                body {
                    font-family: "Poppins";
                }
            </style>
        </head>
        <body style="background-color: #fff; padding: 30px; text-align: center">
            <img
                src="https://images.squarespace-cdn.com/content/5e83092341f99d6d384777ef/1592547010897-WF00319AKLJCVGJZC3ZK/sdc+logo+with+name+alt.png?content-type=image%2Fpng"
                style="width: 250px; padding-bottom: 10px; color: #0c53a0"
                alt="SDC logo"
            />
            <div style="border-radius: 10px; padding: 20px 20px">
                <h5
                    style="
                        color: #000000;
                        font-size: 40px;
                        line-height: 54px;
                        margin-top: 0px;
                        margin-bottom: 37px;
                    "
                >
                    Welcome to SDC!
                </h5>
                <p
                    style="
                        color: #000000;
                        max-width: 400px;
                        font-size: 16px;
                        line-height: 24px;
                        margin: 0px auto;
                        padding-bottom: 45px;
                    "
                >
                    Press the button below to authenticate as ${escapedEmail} and sign
                    in to SDC.
                </p>
                <div style="padding-bottom: 45px">
                    <a href="${url}">
                        <button
                            style="
                                width: 307px;
                                height: 50px;
                                border-radius: 6px;
                                border: 2px solid #0c53a0;
                                background-color: #0c53a0;
                                font-size: 16px;
                                color: #fff;
                            "
                        >
                            Open SDC Registration Platform
                        </button>
                    </a>
                </div>
                <span style="color: #000000; font-size: 16px"
                    >If you did not request this email, you can safely ignore it.</span
                >
            </div>
        </body>
    `;
};

/**
 * Render text email fallback
 * @param {String} url to redirect
 * @param {String} email of requesting user
 * @returns email string
 */
const text = (url: string, email: string): string =>
    `Sign in to Social Diversity for Children as ${email}:\n${url}\n\n`;

// Export email verification request handler
export default sendVerificationRequest;
