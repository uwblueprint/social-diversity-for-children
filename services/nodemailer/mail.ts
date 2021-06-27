// Nodemailer with SES transport, more info here: https://nodemailer.com/transports/ses/
import { transporter } from "@nodemailer";

/**
 * Sends an email to the targetAddress email from the process.env.EMAIL_FROM email
 * @param senderAddress the email address we send from (string)
 * @param targetAddress the email address we want to send to (string)
 * @param subject email subject/title (string)
 * @param text email body (string)
 * @returns Promise<void>
 */
async function sendEmail(
    senderAddress: string,
    targetAddress: string,
    subject: string,
    text: string,
): Promise<void> {
    await transporter.sendMail({
        from: senderAddress,
        to: targetAddress,
        subject: subject,
        text: text,
        ses: {},
    });
}

export { sendEmail };
