// Nodemailer with SES transport, more info here: https://nodemailer.com/transports/ses/
import { transporter } from "@nodemailer";

/**
 * Sends an email using nodemailer with SES transport
 * @param senderAddress the email address we send from (string)
 * @param targetAddress the email address we want to send to (string)
 * @param subject email subject/title (string)
 * @param html email body (string)
 * @returns Promise<void>
 */
export default async function sendEmail(
    senderAddress: string,
    targetAddress: string,
    subject: string,
    html: string,
): Promise<void> {
    await transporter.sendMail({
        from: senderAddress,
        to: targetAddress,
        subject: subject,
        html: html,
        ses: {},
    });
}

export { sendEmail };
