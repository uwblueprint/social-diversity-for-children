import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@prisma";

// TODO: Type the response data
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    switch (req.method) {
        case "GET": {
            const users = await getUsers();
            res.status(200).json(users);
            break;
        }
        case "POST": {
            // TODO:
            break;
        }
        case "PUT": {
            // TODO:
            break;
        }
        case "DELETE": {
            // TODO:
            break;
        }
        default:
            res.setHeader("ALLOW", ["GET", "POST", "PUT", "DELETE"]);
            // TODO: add JSON response for method not allowed
            res.status(405);
    }
}

async function getUsers() {
    return prisma.user.findMany({
        include: {
            teachers: true,
            parents: true,
            program_admins: true,
            volunteers: true,
        },
    });
}
