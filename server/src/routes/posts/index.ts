import { Router } from "express";
import { PostRepository } from "../../interfaces/post";
import { PostController } from "../../controllers/post.controller";
import { validateRoll } from "../../middlewares/validate-roll.middleware";
import { validatePost } from "../../middlewares/validate-post.middleware";
import { validateToken } from "../../middlewares/validate-token.middleware";
import multer from "multer";
const upload = multer();
export const PostRoute = (postModel: PostRepository) => {
  const postRoute = Router();

  const postController = new PostController(postModel);

  postRoute.post(
    "/",
    upload.single("img"),
    validateToken,
    validateRoll,
    validatePost,
    postController.createPost
  );
  postRoute.delete(
    "/:id",
    validateToken,
    validateRoll,
    postController.deletePost
  );
  postRoute.get("/", validateToken, postController.getPosts);
  postRoute.patch(
    "/:id",
    validateToken,
    validateRoll,
    postController.updatePost
  );

  return postRoute;
};
