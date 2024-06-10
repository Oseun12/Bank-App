// src/types/express.d.ts
import { UserAttributes } from '../models/user.model'; // Adjust the import based on your User model location
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes;
    }
  }
}
// types/express.d.ts

import { Request } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            id: number;
            // Add any other properties you expect on the user object
        };
    }
}

import { Request } from "express";

interface User {
  id: number;
  // Add other properties if needed
}

export interface CustomRequest extends Request {
  user?: User;
}
