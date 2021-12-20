import { StripeCheckoutRequest } from "@models/StripeCheckout";
import { ResponseUtil } from "@utils/responseUtil";
import { NextApiRequest, NextApiResponse } from "next";
import { stripe, Stripe } from "services/stripe";

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
            const stripeSession: Stripe.Checkout.SessionCreateParams = {
                payment_method_types: ["card"],
                line_items: [
                    {
                        price: stripeRequest.priceId,
                        quantity: stripeRequest.quantity,
                    },
                ],
                mode: "payment",
                success_url: stripeRequest.successPath
                    ? `${req.headers.origin}/${stripeRequest.successPath}${
                          stripeRequest.successPath.includes("?") ? "&" : "?"
                      }stripe={CHECKOUT_SESSION_ID}`
                    : `${req.headers.origin}/result?stripe={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.referer}`,
                allow_promotion_codes: true,
            };

            // if a coupon ID is passed in then allow use it to apply a discount
            if (stripeRequest.couponId) {
                delete stripeSession["allow_promotion_codes"];
                stripeSession["discounts"] = [
                    {
                        coupon: stripeRequest.couponId,
                    },
                ];
            }

            const session = await stripe.checkout.sessions.create(stripeSession);

            res.status(200).json({ sessionId: session.id });
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
