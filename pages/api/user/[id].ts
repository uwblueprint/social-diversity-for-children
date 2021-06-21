import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@prisma";

// TODO: Type the response data
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
        const { userId } = req.query;

        const user = await getUser(userId as string);

        // TODO: Improve error handling
        if (!user)
            res.status(404).json({ error: "User with provided id not found." });

        res.status(200).json(user);
    } else {
        res.setHeader("Allow", ["GET"]);
        // TODO: add JSON response for method not allowed
        res.status(405);
    }
}

/**
 * NOTE: https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types
 * getUser takes the id parameter and returns
 * the user associated with the userId
 * @param id userId in string
 */
async function getUser(id: string) {
    return prisma.user.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            teachers: true,
            parents: true,
            program_admins: true,
            volunteers: true,
        },
    });
}
