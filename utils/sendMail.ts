import { sendEmail } from "@nodemailer/mail";

/**
 * Handles email sending
 * @param email email address that we need to send to
 * @returns integer (200 success) or (500 fail)
 */
export default async function send(
    email: string,
    subject: string,
    body: string,
): Promise<void> {
    await sendEmail(process.env.EMAIL_FROM, email, subject, body)
        .then(() => {
            return 200;
        })
        .catch((err) => {
            console.log(err);
            return 500;
        });
}
