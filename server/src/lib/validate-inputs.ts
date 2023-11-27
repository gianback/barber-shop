import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

export const User = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .trim()
    .min(1)
    .max(255, {
      message: "name must be between 1 and 255 characters",
    }),
  surname: z
    .string({
      required_error: "Surname is required",
      invalid_type_error: "Surname must be a string",
    })
    .trim()
    .min(1)
    .max(255, {
      message: "surname must be between 1 and 255 characters",
    }),
  lastname: z
    .string({
      required_error: "Lastname is required",
      invalid_type_error: "Lastname must be a string",
    })
    .trim()
    .min(1)
    .max(255, {
      message: "Lastname must be between 1 and 255 characters",
    }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .trim()
    .min(1)
    .max(255, {
      message: "Email must be between 1 and 255 characters",
    })
    .email({
      message: "Email must be a valid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .trim()
    .min(1)
    .max(50, {
      message: "Password must be between 1 and 50 characters",
    }),
});
export const Post = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .trim()
    .min(1)
    .max(255, {
      message: "name must be between 1 and 255 characters",
    }),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .trim()
    .min(1)
    .max(255, {
      message: "Description must be between 1 and 255 characters",
    }),
  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
    .trim()
    .min(1, {
      message: "Content must be min 1 character",
    }),
  slug: z
    .string({
      required_error: "Slug is required",
      invalid_type_error: "Slug must be a string",
    })
    .trim()
    .min(1)
    .max(255, {
      message: "Slug must be between 1 and 255 characters",
    }),
  img: z
    .any()
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});
export const Service = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .trim()
    .min(1)
    .max(255, {
      message: "name must be between 1 and 255 characters",
    }),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .trim()
    .min(1, {
      message: "Description must be min 1 character",
    }),
  img: z
    .any()
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .nonnegative({
      message: "Price must be a positive number",
    })
    .finite({
      message: "Price must be a finite number",
    })
    .lte(7, {
      message: "Price must be less than 7 digits",
    }),
});
export const Appointment = z.object({
  date: z
    .date({
      required_error: "Date is required",
      invalid_type_error: "Date must be a date",
    })
    .max(new Date(2023, 12, 31), {
      message: "Date must be less than 2023-12-31",
    }),

  service_id: z
    .number({
      required_error: "service_id is required",
      invalid_type_error: "service_id must be a number",
    })
    .int({
      message: "service_id must be an integer",
    }),

  user_id: z
    .number({
      required_error: "user_id is required",
      invalid_type_error: "user_id must be a number",
    })
    .int({
      message: "user_id must be an integer",
    }),
  paymentId: z
    .string({
      required_error: "paymentId is required",
      invalid_type_error: "paymentId must be a string",
    })
    .trim()
    .min(1)
    .max(70, {
      message: "paymentId must be between 1 and 70 characters",
    }),
});
export const Roll = z.enum(["admin"]);

export const Login = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Email must be a valid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(1, {
      message: "Password must be min 1 character",
    }),
});
