import { api } from "@/lib/api";
import { IBlog } from "@/types/auth";
import { useEffect, useState } from "react";
import { Container } from "./Container";
import { Link } from "react-router-dom";
export function Blogs() {
  const [blogList, setSetblogList] = useState<IBlog[]>([]);

  const fetchBlogs = async () => {
    const response = await api.get("/posts");

    const formatTimeBlog = response.data.map((blog: IBlog) => {
      const date = new Date(blog.createdAt);
      const newDate = new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
      }).format(date);

      return {
        ...blog,
        createdAt: newDate,
      };
    });

    setSetblogList(formatTimeBlog);
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
          {blogList?.map(({ description, id, img, title, slug, createdAt }) => (
            <Link to={`/blog/${slug}`} key={`${id}-${title}`}>
              <picture>
                <img
                  className="aspect-square w-full object-cover"
                  src={img}
                  alt=""
                />
              </picture>
              <div className="bg-white p-4">
                <p className="text-end mb-4"> {createdAt}</p>
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                <p>{description}</p>
              </div>
            </Link>
          ))}
        </ul>
      </Container>
    </section>
  );
}
