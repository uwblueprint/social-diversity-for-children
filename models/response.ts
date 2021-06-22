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

export class ServiceResponse {
    respondWithNotFound(res: NextApiResponse, message: string): void {
        res.status(404).json({ test: message });
    }
}
