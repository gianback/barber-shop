import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { Container } from "./Container";
import { BlogCard } from "./BlogCard";
import { IBlog } from "@/types/blog";
export function Blogs() {
  const [blogList, setSetblogList] = useState<IBlog[]>([]);

  const fetchBlogs = async () => {
    const response = await api.get("/posts");
    setSetblogList(response.data);
  };

  useEffect(() => {
    fetchBlogs();

    return () => {
      const controller = new AbortController();
      controller.abort();
    };
  }, []);

  return (
    <section className="bg-secondary py-8 lg:py-16">
      <Container>
        <h2 className="text-3xl lg:text-5xl text-center text-white font-bold mb-8">
          Blogs
        </h2>
        <ul className="grid gap-4 md:gap-12 md:grid-cols-2 lg:grid-cols-3 ">
          {blogList?.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
