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
    const { title, content, userId } = req.body;
    const file = req.files && (req.files.file as UploadedFile);
    const buffer = file && Buffer.from(file.data);
    const img = await cloudinaryService(buffer as Buffer);

    const { message, status } = await this.postModel.createPost({
      content,
      img,
      title,
      userId,
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
      const file = req.files.file as UploadedFile;
      const buffer = file && Buffer.from(file.data);
      const imgUrl = await cloudinaryService(buffer as Buffer);

      newPropertiesPost.img = imgUrl;
    }

    const { message, status } = await this.postModel.updatePost({
      id: id as string,
      ...newPropertiesPost,
    });

    res.status(status).json({ message });
  };
}
