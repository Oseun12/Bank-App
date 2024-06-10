import { Audit } from "../persistence/entity/audit";

// export class AuditService {
//     static getAuditLogs() {
//         throw new Error("Method not implemented.");
//     }
//     static logAction(id: any, arg1: string) {
//         throw new Error("Method not implemented.");
//     }
//     public async logAction(userId: number, action: string): Promise<void> {
//         await Audit.create({ userId, action });
//     }
//     public async getAuditLogs(): Promise<Audit[]> {
//         return await Audit.findAll();
//     }
// }
export async function logAction(userId: number, action: string) {
    await Audit.create({ userId, action });
}

// Standalone function to get audit logs
export async function getAuditLogs(): Promise<Audit[]> {
    return await Audit.findAll();
}

// Placeholder function to match the static methods in the original class
export function staticLogAction(id: any, arg1: string) {
    throw new Error("Method not implemented.");
}

export function staticGetAuditLogs() {
    throw new Error("Method not implemented.");
}