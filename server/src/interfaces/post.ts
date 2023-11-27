import { GeneralResponse } from "./response";

export interface PostInterface {
  id?: string;
  title: string;
  content: string;
  img: string;
  user_id: string;
}

export interface PostRepository {
  createPost(post: PostInterface): Promise<GeneralResponse>;
  getPosts(): Promise<PostInterface[]>;
  deletePost(post_id: string): Promise<GeneralResponse>;
  updatePost({ id, ...newUser }: PostUpdate): Promise<GeneralResponse>;
}

export type PostUpdate = {
  id: string;
  title?: string;
  content?: string;
  img?: string;
};

export type PostUpdateOmitId = Omit<PostUpdate, "id">;
