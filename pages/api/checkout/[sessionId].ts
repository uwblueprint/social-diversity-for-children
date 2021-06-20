import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// set up stripe instance
// TODO: set this as exportable variable in utils directory
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
});

/**
 * sessionIdHandler takes the sessionId parameter and returns
 * the Stripe session information associated with the sessionId
 * @param req API request object
 * @param res API response object
 */
export default async function sessionIdHandler(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    if (req.method == "GET") {
        // obtain the sessionId
        const { sessionId } = req.query;

        // obtain the session information from sessionId
        const session = await stripe.checkout.sessions.retrieve(
            sessionId as string,
            {
                expand: ["payment_intent"],
            },
        );

        // return session information
        res.status(200).json({ session });
    } else {
        res.setHeader("Allow", ["GET"]);
        // TODO: add JSON response for method not allowed
        res.status(405);
    }
}
