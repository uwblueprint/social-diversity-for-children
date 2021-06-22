import { NextApiResponse } from "next";

/**
 * @class ResponseUtil: Class for handling responses
 */
export class ResponseUtil {
    /**
     * Method for returning a status 200 success response
     * @param res NextApiResponse
     * @param message Optional message
     * @param data Optional data
     */
    returnSuccess(
        res: NextApiResponse,
        message?: string,
        data?: unknown,
    ): void {
        res.status(200).json({ message, data });
    }

    /**
     * Method for returning a status 400 bad request response
     * @param res NextApiResponse
     * @param message Optional message
     */
    returnBadRequest(res: NextApiResponse, message?: string): void {
        if (message === undefined) {
            message = "Bad Request.";
        }
        res.status(400).json({ error: message });
    }

    /**
     * Method for returning a status 404 not found response
     * @param res NextApiResponse
     * @param message Optional message
     */
    returnNotFound(res: NextApiResponse, message?: string): void {
        if (message === undefined) {
            message = "Resource not found.";
        }
        res.status(404).json({ error: message });
    }

    /**
     * Method for returning a status 405 method not allowed response
     * @param res NextApiResponse
     * @param message Optional message
     */
    returnMethodNotAllowed(res: NextApiResponse, message?: string): void {
        if (message === undefined) {
            message = "Method not allowed.";
        }
        res.status(405).json({ error: message });
    }
}
