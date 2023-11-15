import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const validateRoll = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   try {
  //     const result = Post.parse(post);

  //     next();
  //   } catch (error) {
  //     if (error instanceof ZodError) {
  //       return res.status(400).json({
  //         message: error.issues.map(({ message }) => {
  //           message;
  //         }),
  //       });
  //     }

  //     throw new Error("Error middleware post");
  //   }

  next();
};
