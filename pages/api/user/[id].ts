import { ServiceResponse } from "models/response";
import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../../../services/database/user";
// TODO: Type the response dataF
/**
 * handle takes the userId parameter and returns
 * the user associated with the userId
 * @param req API request object
 * @param res API response object
 */
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    if (req.method == "GET") {
        // Obtain user id
        const { id } = req.query;

        // obtain user with provided userId
        const user = await getUser(id as string);
        const response = new ServiceResponse();

        // TODO: Improve error handling
        if (!user) {
            response.respondWithNotFound(
                res,
                "User with provided id not found.",
            );
            return;
        }
        // res.status(404).json({ error: "User with provided id not found." });

        res.status(200).json(user);
    } else {
        res.setHeader("Allow", ["GET"]);
        // TODO: add JSON response for method not allowed
        res.status(405);
    }
}
