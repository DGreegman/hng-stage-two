import { Response } from "express";

const validation_error = async (response: Response, field: string) => {
    
    if (field) return response.status(422).json({
        errors: [
            {
                field: field,
                message: `${field} is required`
            }
        ]
    });
}

export default validation_error;