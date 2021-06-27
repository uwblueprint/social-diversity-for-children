import nodemailer from "nodemailer";
import { SendVerificationRequest } from "next-auth/providers";

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
const html = (url: string, email: string) => {
    // Collect escaped email (for various email clients that might parse as link)
    const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;

    // Generate html email template
    return `
      <body
        style="
          background-color: #f5f6f7;
          padding: 30px;
          text-align: center;
          font-family: 'Arial';
        "
      >
        <img
          src="https://images.squarespace-cdn.com/content/5e83092341f99d6d384777ef/1592545178617-8IPTVQIWZEID0O9CDZOE/sdc+logo+with+name.png?content-type=image%2Fpng"
          style="width: 200px; padding-bottom: 10px"
          alt="SDC logo"
        />
        <div
          style="background-color: #fff; border-radius: 10px; padding: 20px 20px"
        >
          <h1
            style="
              color: #a72a1d;
              font-size: 32px;
              line-height: 38px;
              margin-top: 0px;
              margin-bottom: 5px;
            "
          >
            Welcome to SDC!
          </h1>
          <p
            style="
              color: #42526e;
              max-width: 500px;
              font-size: 18px;
              line-height: 150%;
              margin: 0px auto;
            "
          >
            Press the button below to authenticate as ${escapedEmail} and sign in to
            SDC.
          </p>
          <div style="padding: 50px 0px">
            <a
              href=${url}
              style="
                background-color: #42526e;
                color: #fff;
                padding: 15px 40px;
                border-radius: 4px;
                font-size: 18px;
                text-decoration: none;
              "
              >Open SDC</a
            >
          </div>
          <span style="color: #42526e; font-size: 14px"
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
const text = (url: string, email: string) =>
    `Sign in to Social Diversity for Children as ${email}:\n${url}\n\n`;

// Export email verification request handler
export default sendVerificationRequest;
