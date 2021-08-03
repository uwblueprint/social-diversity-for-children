import { ResponseUtil } from "@utils/responseUtil";
import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "services/stripe";

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
    switch (req.method) {
        case "GET": {
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
