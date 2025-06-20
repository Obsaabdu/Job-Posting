import { NextFunction, Request, Response } from "express";
import { object, ZodSchema } from "zod";

export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)   ;
    if (!result.success) {
        const errors = result.error.issues.map((e) => e.message);
        res.status(400).json({
            success: false,
            message: "Validation failed",
            object: null,
            errors,
        });
        return;
    }
    req.body = result.data;
    next();
};
