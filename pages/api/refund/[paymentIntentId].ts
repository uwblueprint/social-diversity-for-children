import { ResponseUtil } from "@utils/responseUtil";
import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "services/stripe";

/**
 * handler takes the paymentIntentId parameter and returns
 * the Stripe refund information associated with the payment intent
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    switch (req.method) {
        case "POST": {
            // obtain the payment intent
            const { paymentIntentId } = req.query;

            // create refund from payment intent
            const refund = await stripe.refunds.create({
                payment_intent: paymentIntentId as string,
            });

            // return refund information
            res.status(200).json({ refund });
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
