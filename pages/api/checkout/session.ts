import { StripeCheckoutRequest } from "@models/StripeCheckout";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// set up stripe instance
// TODO: set this as exportable variable in utils directory
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
});

/**
 * sessionHandler creates a new stripe session and returns the
 * session ID
 * @param req API request object
 * @param res API response object
 */
export default async function sessionHandler(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    if (req.method == "POST") {
        const stripeRequest = req.body as StripeCheckoutRequest;
        // TODO: obtain price id as part of body
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price: stripeRequest.priceId,
                    quantity: stripeRequest.quantity,
                },
            ],
            mode: "payment",
            success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/checkout`,
        });
        res.status(200).json({ sessionId: session.id });
    } else {
        res.setHeader("Allow", ["POST"]);
        // TODO: add JSON response for method not allowed
        res.status(405);
    }
}
