import { pool } from "../../config/mysql";
import {
  PostInterface,
  PostUpdate,
  PostUpdateOmitId,
} from "../../interfaces/post";
import { GeneralResponse } from "../../interfaces/response";

export class PostModelMysql {
  static async createPost(post: PostInterface): Promise<GeneralResponse> {
    try {
      await pool.query("INSERT INTO post SET ?", [post]);

      return {
        status: 201,
        message: "Post created",
      };
    } catch (error: any) {
      if (error.code === "ER_DUP_ENTRY") {
        return {
          status: 400,
          message: `Post with name ${post.title} already exists`,
        };
      }

      throw new Error("Something went wrong creating the post with MYSQL");
    }
  }

  static async getPosts(): Promise<PostInterface[]> {
    try {
      const findPosts = await pool.query<PostInterface[]>("SELECT * FROM post");

      return findPosts;
    } catch (error: any) {
      throw new Error(`Error: ${error.sqlMessage}`);
    }
  }

  static async deletePost(post_id: string): Promise<GeneralResponse> {
    try {
      await pool.query("DELETE FROM post WHERE id = ?", [post_id]);

      return {
        status: 200,
        message: "Post deleted",
      };
    } catch (error: any) {
      console.log({ error });
      throw new Error(`Error: ${error.sqlMessage}`);
    }
  }

  static async updatePost({
    id,
    ...newUser
  }: PostUpdate): Promise<GeneralResponse> {
    let queryEntries = "";

    for (let key in newUser) {
      queryEntries += `${key} = ${newUser[key as keyof PostUpdateOmitId]}, `;
    }
    queryEntries = queryEntries.slice(0, -2);

    try {
      await pool.query(`UPDATE post SET ${queryEntries} WHERE id = ?`, [id]);

      return {
        status: 200,
        message: "Post updated",
      };
    } catch (error: any) {
      console.log({ error });

      throw new Error(`Error: ${error.sqlMessage}`);
    }
  }

  static async getPostBySlug(slug: string): Promise<PostInterface> {
    try {
      const post = (await pool.query("SELECT * from post WHERE slug = ?", [
        slug,
      ])) as PostInterface[];
      return post[0];
    } catch (error: any) {
      console.log({ error });
      throw new Error(`Error: ${error.sqlMessage}`);
    }
  }
  static async getRelatedPost(slug: string): Promise<PostInterface[]> {
    try {
      const post = (await pool.query(
        "SELECT * from post WHERE NOT slug = ? LIMIT 3",
        [slug]
      )) as PostInterface[];
      return post;
    } catch (error: any) {
      console.log({ error });
      throw new Error(`Error: ${error.sqlMessage}`);
    }
  }
}
