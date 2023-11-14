import { Router } from "express";
import { PostRepository } from "../../interfaces/post";
import { PostController } from "../../controllers/post.controller";

export const PostRoute = (postModel: PostRepository) => {
  const postRoute = Router();

  const postController = new PostController(postModel);

  postRoute.post("/", postController.createPost);
  postRoute.delete("/:id", postController.deletePost);
  postRoute.get("/", postController.getPosts);
  postRoute.patch("/:id", postController.updatePost);

  return postRoute;
};
