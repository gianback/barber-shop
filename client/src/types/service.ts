import * as z from "zod";

export type IService = CreateServiceSchema & {
  id: number;
  img: string;
  slug: string;
};
export type CreateServiceSchema = z.infer<typeof createServiceSchema>;

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
