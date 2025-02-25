import { z } from "zod";

export const validateForm = <T extends object>(
  validatePayload: T,
  schema: z.ZodSchema<T>
): boolean => {
  const validationErrors: { [key: string]: string } = {};

  // Zod VALIDATION
  const validationResult = schema.safeParse(validatePayload);

  // VALIDATION RESULT
  if (!validationResult.success) {
    validationResult.error.errors.forEach((err) => {
      // CHECK ERROR FIELD
      if (err.path[0]) {
        validationErrors[err.path[0]] = err.message;
      }
    });
  }

  // SET ERROR
  //   Object.keys(validationErrors).length
  //     ? setErrors(validationErrors)
  //     : setErrors({});

  // return true IF NO VALIDATION ERROR FOUND
  return Object.keys(validationErrors).length === 0;
};
