import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export function validateDTO(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // 1. Transform plain JSON into an instance of the DTO class
    const dtoInstance = plainToInstance(dtoClass, req.body);

    // 2. Validate the class instance against decorators
    const errors: ValidationError[] = await validate(dtoInstance);

    if (errors.length > 0) {
      // Format errors into a clean readable English response
      const formattedErrors = errors.map(err => ({
        property: err.property,
        constraints: Object.values(err.constraints || {})
      }));

      res.status(400).json({ errors: formattedErrors });
      return;
    }

    // Replace raw body with the safely validated class instance
    req.body = dtoInstance;
    return next();
  };
}
