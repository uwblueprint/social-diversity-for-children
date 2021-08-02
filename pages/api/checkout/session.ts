import { StripeCheckoutRequest } from "@models/StripeCheckout";
import { ResponseUtil } from "@utils/responseUtil";
import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "services/stripe";

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
    switch (req.method) {
        case "POST": {
            const stripeRequest = req.body as StripeCheckoutRequest;
            // if a coupon ID is passed in then apply an automatic discount
            if (stripeRequest.couponId) {
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
                    discounts: [
                        {
                            coupon: stripeRequest.couponId,
                        },
                    ],
                });

                res.status(200).json({ sessionId: session.id });
            }
            // otherwise allow promotion codes to be entered
            else {
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
                    allow_promotion_codes: true,
                });

                res.status(200).json({ sessionId: session.id });
            }
            break;
        }
        default: {
            const allowedHeaders: string[] = ["POST"];
            ResponseUtil.returnMethodNotAllowed(
                res,
                allowedHeaders,
                `Method ${req.method} Not Allowed`,
            );
        }
    }
}
