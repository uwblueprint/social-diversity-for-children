import { NextApiResponse } from "next";

/**
 * @class ResponseUtil: Class for handling responses
 */
export class ResponseUtil {
    /**
     * Method for returning a 200 Status OK response
     * @param res NextApiResponse
     * @param data Optional data
     */
    static returnOK(res: NextApiResponse, data?: unknown): void {
        if (data) {
            res.status(200).json({ data });
        } else {
            res.status(200);
        }
    }

    /**
     * Method for returning a status 400 Bad Request response
     * @param res NextApiResponse
     * @param message Optional message
     */
    static returnBadRequest(res: NextApiResponse, message: string): void {
        res.status(400).json({ error: message });
    }

    /**
     * Method for returning a status 404 Not Found Response
     * @param res NextApiResponse
     * @param message Optional message
     */
    static returnNotFound(res: NextApiResponse, message: string): void {
        res.status(404).json({ error: message });
    }

    /**
     * Method for returning a status 405 Method Not Allowed response
     * @param res NextApiResponse
     * @param allowedHeaders Array of Allowed Headers for Method
     * @param message Optional message
     */
    static returnMethodNotAllowed(
        res: NextApiResponse,
        allowedHeaders: string[],
        message?: string,
    ): void {
        if (message === undefined) {
            message = "Method not allowed.";
        }
        res.setHeader("Allow", allowedHeaders);
        res.status(405).json({ error: message });
    }
}
