import { UploadedFile } from "express-fileupload";

import { PostRepository, PostUpdateOmitId } from "../interfaces/post";
import { cloudinaryService } from "../services/cloudinary.service";
import { Request, Response } from "express";

export class PostController {
  private postModel: PostRepository;

  constructor(postModel: PostRepository) {
    this.postModel = postModel;
  }

  createPost = async (req: Request, res: Response) => {
    const { title, content, user_id } = req.body;
    const file = req.file;
    const img = (await cloudinaryService(file?.buffer as Buffer)) as any;

    const { message, status } = await this.postModel.createPost({
      content,
      img: img.url,
      title,
      user_id,
    });

    res.status(status).json({ message });
  };

  getPosts = async (req: Request, res: Response) => {
    const posts = await this.postModel.getPosts();

    res.status(200).json(posts);
  };

  deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { message, status } = await this.postModel.deletePost(id);

    res.status(status).json({ message });
  };

  updatePost = async (req: Request, res: Response) => {
    const { ...restPost } = req.body;
    const { id } = req.params;
    const newPropertiesPost: PostUpdateOmitId = Object.fromEntries(
      Object.entries(restPost).filter(([key, value]) => value !== undefined)
    );
    if (req.files) {
      const file = req.file;
      const imgUrl = (await cloudinaryService(file?.buffer as Buffer)) as any;

      newPropertiesPost.img = imgUrl.url;
    }

    const { message, status } = await this.postModel.updatePost({
      id: id as string,
      ...newPropertiesPost,
    });

    res.status(status).json({ message });
  };
}
