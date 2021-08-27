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
    <link
        href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
        rel="stylesheet"
    />

    <style>
        body {
            font-family: "Poppins";
        }
    </style>
</head>
<body style="background-color: #fff; padding: 30px; text-align: center">
    <span
        class="material-icons-outlined"
        style="font-size: 95px; color: #0c53a0"
    >
        check_circle
    </span>
    <div
        style="background-color: #fff; border-radius: 10px; padding: 20px 20px"
    >
        <h5
            style="
                color: #000000;
                font-size: 36px;
                line-height: 54px;
                margin-top: 0px;
                margin-bottom: 37px;
            "
        >
            Thank you for registering!
        </h5>
        <p
            style="
                color: #000000;
                max-width: 581px;
                font-size: 16px;
                line-height: 24px;
                margin: 0px auto;
                padding-bottom: 100px;
            "
        >
            We look forward to seeing you at our program. Look out for an email
            from us shortly with more information!
        </p>
        <div style="padding-bottom: 15px">
            <a href="http://localhost:3000/">
                <button
                    style="
                        width: 365px;
                        height: 50px;
                        border-radius: 6px;
                        border: 2px solid #0c53a0;
                        background-color: #fff;
                        font-family: Poppins;
                        font-size: 16px;
                        color: #0c53a0;
                    "
                >
                    View upcoming classes
                </button>
            </a>
        </div>
        <div>
            <a href="http://localhost:3000/">
                <button
                    style="
                        width: 365px;
                        height: 50px;
                        border-radius: 6px;
                        border: 2px solid #0c53a0;
                        background-color: #0c53a0;
                        font-family: Poppins;
                        font-size: 16px;
                        color: #fff;
                    "
                >
                    Browse programs
                </button>
            </a>
        </div>
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
