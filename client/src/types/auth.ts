import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email es requerido.",
    })
    .email({
      message: "Email debe ser válido.",
    })
    .max(255, {
      message: "Email debe ser máximo 255 caracteres.",
    }),
  password: z
    .string({
      required_error: "Contraseña es requerida.",
    })
    .min(1, {
      message: "Contraseña es requerida.",
    })
    .max(50, {
      message: "Contraseña debe ser máximo 50 caracteres.",
    }),
});
