import { NextFunction, Request, Response } from "express";
import { Post } from "../lib/validate-inputs";
import { ZodError } from "zod";

export const validatePost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content, description } = req.body;
  const img = req.file;

  if (!img) {
    return res.status(400).json({
      message: "Image is required",
    });
  }

  const post = {
    title,
    content,
    description,
    img,
  };

  try {
    Post.parse(post);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorFormated = error.issues.map(({ message }) => {
        message;
      });
      return res.status(400).json({
        message: errorFormated,
      });
    }

    throw new Error("Error middleware post");
  }
};
