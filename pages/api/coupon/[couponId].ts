import { ResponseUtil } from "@utils/responseUtil";
import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "services/stripe";

/**
 * handler takes the couponId parameter and returns
 * the Stripe coupon information associated with the coupon id
 * @param req API request object
 * @param res API response object
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    switch (req.method) {
        case "GET": {
            // obtain the coupondId
            const { couponId } = req.query;

            // obtain the coupon information from coupon id
            const coupon = await stripe.coupons.retrieve(couponId as string);

            // return coupon information
            res.status(200).json({ coupon });
            break;
        }
        default: {
            const allowedHeaders: string[] = ["GET"];
            ResponseUtil.returnMethodNotAllowed(
                res,
                allowedHeaders,
                `Method ${req.method} Not Allowed`,
            );
        }
    }
}
