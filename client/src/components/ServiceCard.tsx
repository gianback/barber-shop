import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface Props {
  id: number;
  img: string;
  price: number;
  description: string;
  slug: string;
  name: string;
}

export function ServiceCard({
  id,
  img,
  price,
  description,
  slug,
  name,
}: Props) {
  return (
    <article
      key={id}
      className="rounded-bl-xl rounded-br-xl flex flex-col"
      style={
        {
          boxShadow: "4px 5px 8px rgba(0, 0, 0, 0.35)",
        } as CSSProperties
      }
    >
      <picture>
        <img
          src={img}
          className="w-full object-cover aspect-square"
          alt={name}
        />
      </picture>
      <div className="py-7 px-5 flex flex-col h-full">
        <div className="flex justify-between gap-4 items-center">
          <h3 className="font-bold">{name}</h3>
          <span className="flex-shrink-0 bg-black p-1 px-2 rounded-md text-white">
            $ {price.toFixed(2)}
          </span>
        </div>
        <p className="my-4" style={{ textWrap: "balance" } as CSSProperties}>
          {description}
        </p>
        <Link to={`/contact?service=${slug}`} className="mt-auto block">
          <Button className="bg-primary w-full">Quiero atenderme</Button>
        </Link>
      </div>
    </article>
  );
}
