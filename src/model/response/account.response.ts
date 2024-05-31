import { BaseResponse } from "./baseResponse";

export interface AccountResponse extends BaseResponse {
    userId: string;
    balance: number;
    status: string;
}