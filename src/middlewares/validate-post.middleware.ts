import { NextFunction, Request, Response } from "express";
import { Post } from "../lib/validate-inputs";
import { ZodError } from "zod";

export const validatePost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content, userId } = req.body;
  const img = req.files && req.files[0];
  const post = {
    title,
    content,
    userId,
    img,
  };

  try {
    const result = Post.parse(post);

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: error.issues.map(({ message }) => {
          message;
        }),
      });
    }

    throw new Error("Error middleware post");
  }

  next();
};
