import * as z from "zod";

export type ContactInterface = z.infer<typeof zodContactSchema>;

export const zodContactSchema = z.object({
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
      message: "Apellido Paterno es requerido.",
    })
    .max(255, {
      message: "Apellido Paterno debe ser máximo 255 caracteres.",
    }),
  lastname: z
    .string()
    .min(1, {
      message: "Apellido Paterno  es requerido.",
    })
    .max(255, {
      message: "Apellido Paterno debe ser máximo 255 caracteres.",
    }),
  date: z.date({
    required_error: "Fecha es requerida.",
    invalid_type_error: "Fecha debe ser una fecha válida.",
  }),
  hour: z
    .string()
    .min(1, {
      message: "Hora es requerida.",
    })
    .max(255, {
      message: "Hora debe ser máximo 255 caracteres.",
    }),
  service: z
    .string()
    .min(1, {
      message: "Servicio es requerido.",
    })
    .max(255, {
      message: "Hora debe ser máximo 255 caracteres.",
    }),
});
