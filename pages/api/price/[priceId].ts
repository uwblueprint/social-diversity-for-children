import { ResponseUtil } from "@utils/responseUtil";
import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "services/stripe";

/**
 * handler takes the priceId parameter and returns
 * the Stripe price information associated with the priceId
 * @param req API request object
 * @param res API response object
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    switch (req.method) {
        case "GET": {
            try {
                // obtain the priceId
                const { priceId } = req.query;

                // obtain the price information from priceId
                const price = await stripe.prices.retrieve(priceId as string);

                // return price information
                res.status(200).json({ price });
                break;
            } catch (e) {
                ResponseUtil.returnBadRequest(res, e);
                break;
            }
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
