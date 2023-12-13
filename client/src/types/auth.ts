import * as z from "zod";

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type CreateServiceSchema = z.infer<typeof createServiceSchema>;
export type IService = CreateServiceSchema & {
  id: number;
  img: string;
  slug: string;
};
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
  name: z.string().min(1, {
    message: "Nombre es requerido.",
  }),
  surname: z.string().min(1, {
    message: "Apellido  es requerido.",
  }),
  lastname: z.string().min(1, {
    message: "Apellido  es requerido.",
  }),
});

export const createServiceSchema = z.object({
  name: z.string().min(1, {
    message: "Nombre es requerido.",
  }),
  description: z
    .string()
    .min(1, {
      message: "Descripción es requerido.",
    })
    .max(255, {
      message: "Descripción debe ser máximo 255 caracteres.",
    }),
  // img: z.custom<File>(),
  price: z
    .number({
      required_error: "Precio es requerido.",
      invalid_type_error: "Precio debe ser un número.",
    })
    .min(1, {
      message: "Precio es requerido.",
    })
    .max(99999.99, {
      message: "Precio debe ser máximo 99999.99",
    })
    .multipleOf(0.01, {
      message: "Precio debe ser máximo 2 decimales.",
    })
    .nonnegative({
      message: "Precio debe ser mayor a 0.",
    }),
});
