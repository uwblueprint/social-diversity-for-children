// /**
//  * @interface ResponseObject : Backend API response object
//  * @property message: success/error message to send back to the client
//  * @property data?: if requested, API can send required data through this field
//  */
// export interface ResponseObject {
//     message: string;
//     data?: Record<string, unknown>;
// }

import { NextApiResponse } from "next";

export class ResponseUtil {
    returnSuccess(res: NextApiResponse, message: string, data?: unknown): void {
        res.status(200).json({ message, data });
    }

    returnBadRequest(res: NextApiResponse, message: string): void {
        if (!message || message.length === 0) {
            message = "Bad Request.";
        }
        res.status(400).json({ error: message });
    }

    returnNotFound(res: NextApiResponse, message: string): void {
        if (!message || message.length === 0) {
            message = "Resource not found.";
        }
        res.status(404).json({ error: message });
    }

    returnMethodNotAllowed(res: NextApiResponse, message: string): void {
        if (!message || message.length === 0) {
            message = "Method not allowed.";
        }
        res.status(405).json({ error: message });
    }
}
