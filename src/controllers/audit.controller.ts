import { Request, Response } from "express";
import { logAction, staticGetAuditLogs } from "../service/audit.service";
import { Audit } from "../persistence/entity/audit";

export async function getAuditLogs(req: Request, res: Response): Promise<void> {
    try {
        const logs = await getAuditLogsService();
        res.status(200).json(logs);
    } catch (error) {
        console.error('Error: ', error)
        res.status(500).json({ message: 'Internal server error-10' })
    }
}

function getAuditLogsService() {
    throw new Error("Function not implemented.");
}
