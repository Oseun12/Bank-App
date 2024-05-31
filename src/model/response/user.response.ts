import { BaseResponse } from "./baseResponse";

export interface UserResponse {
    id: number;
    userName: string;
    password: string;
    role: string;
    email: string;
    status: string;
}