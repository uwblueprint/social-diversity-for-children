export interface ResponseObject {
    status: number;
    message: string;
    data?: Record<string, unknown>;
}
