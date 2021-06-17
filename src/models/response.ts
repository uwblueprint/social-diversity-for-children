/**
 * @interface ResponseObject : Backend API response object
 * @property status: status code to return to the client
 * @property message: success/error message to send back to the client
 * @property data?: if requested, API can send required data through this field
 */
export interface ResponseObject {
    status: number;
    message: string;
    data?: Record<string, unknown>;
}
