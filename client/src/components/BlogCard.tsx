import { formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";

export function BlogCard({
  slug,
  id,
  title,
  img,
  description,
  createdAt,
}: {
  slug: string;
  id: number;
  title: string;
  img: string;
  description: string;
  createdAt: string;
}) {
  return (
    <Link to={`/blog/${slug}`} key={`${id}-${title}`}>
      <picture>
        <img
          className="aspect-square w-full object-cover "
          src={img}
          alt={title}
        />
      </picture>
      <div className="bg-white p-4">
        <p className="text-end mb-4"> {formatDate(createdAt)}</p>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}
