import * as z from "zod";
export type CreateBlogSchema = z.infer<typeof createBlogSchema>;

export type IBlog = CreateBlogSchema & {
  id: number;
  img: string;
  slug: string;
  createdAt: string;
};
export const createBlogSchema = z.object({
  title: z
    .string({
      required_error: "Se requiere un título",
      invalid_type_error: "El título debe ser una cadena de texto",
    })
    .trim()
    .min(1, {
      message: "El título debe tener al menos 1 caracter",
    })
    .max(255, {
      message: "El título debe tener entre 1 y 255 caracteres",
    }),
  description: z
    .string({
      required_error: "Se requiere una descripción",
      invalid_type_error: "La descripción debe ser una cadena de texto",
    })
    .trim()
    .min(1, {
      message: "La descripción debe tener al menos 1 caracter",
    })
    .max(255, {
      message: "La descripción debe tener entre 1 y 255 caracteres",
    }),
  content: z
    .string({
      required_error: "Se requiere contenido",
      invalid_type_error: "El contenido debe ser una cadena de texto",
    })
    .trim()
    .min(1, {
      message: "El contenido debe tener al menos 1 caracter",
    }),
});
