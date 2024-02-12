import * as z from "zod";

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
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

export const registerSchema = loginSchema.extend({
  name: z
    .string()
    .min(1, {
      message: "Nombre es requerido.",
    })
    .max(255, {
      message: "Nombre debe ser máximo 255 caracteres.",
    }),
  surname: z
    .string()
    .min(1, {
      message: "Apellido  es requerido.",
    })
    .max(255, {
      message: "Apellido debe ser máximo 255 caracteres.",
    }),
  lastname: z
    .string()
    .min(1, {
      message: "Apellido  es requerido.",
    })
    .max(255, {
      message: "Apellido debe ser máximo 255 caracteres.",
    }),
});
