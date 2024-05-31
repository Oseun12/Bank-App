import { BaseResponse } from "./baseResponse";

export interface AuditResponse extends BaseResponse {
    id: number;
    userId: number;
    action: string;
    timestamp: Date;
}