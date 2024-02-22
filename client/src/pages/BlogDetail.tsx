import { BlogCard } from "@/components/BlogCard";
import { Container } from "@/components/Container";
import { getPostBySlug, getRelatedPosts } from "@/services/blog.service";
import { IBlog } from "@/types/blog";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<IBlog>();
  const [blogRelated, setBlogRelated] = useState<IBlog[]>([]);

  const getPost = useCallback(async () => {
    try {
      const response = await getPostBySlug(slug as string);
      if (response.status === 200) setBlog(response.data);
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching blog by slug");
    }
  }, [slug]);

  const getRelatedPost = useCallback(async () => {
    try {
      const response = await getRelatedPosts(slug as string);
      if (response.status === 200) setBlogRelated(response.data);
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching related blogs");
    }
  }, [slug]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  useEffect(() => {
    getRelatedPost();
  }, [getRelatedPost]);

  return (
    <main className="min-h-screen py-8 lg:py-20 bg-secondary ">
      <Container>
        <h1 className="text-3xl font-bold uppercase md:text-4xl lg:text-6xl text-white text-center">
          {blog?.title}
        </h1>
        <picture className="flex justify-center items-center my-4 md:my-8 lg:my-16">
          <img src={blog?.img} alt={blog?.title} />
        </picture>
        <p
          className="[&>h2]:text-xl [&>h3]:text-2xl lg:[&>h2]:text-2xl text-white [&>p]:text-sm lg:[&>p]:text-lg [&>p]:font-medium lg:[&>h3]:text-2xl [&>h2]:my-2 [&>h3]:my-2 [&>p>strong]:my-2 [&>p>strong]:block [&>strong]:mb-2"
          dangerouslySetInnerHTML={{
            __html: blog?.content.replaceAll("<p><br /></p>", "") as string,
          }}
        />
        <aside>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mt-8 lg:mt-16 text-white">
            Te puede interesar:
          </h2>
          <div className="grid md:grid-cols-3 pt-8 md:pt-12">
            {blogRelated.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        </aside>
      </Container>
    </main>
  );
}
