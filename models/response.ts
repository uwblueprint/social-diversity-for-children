/**
 * @interface ResponseObject : Backend API response object
 * @property message: success/error message to send back to the client
 * @property data?: if requested, API can send required data through this field
 */
export interface ResponseObject {
    message: string;
    data?: Record<string, unknown>;
}
