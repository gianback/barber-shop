import { CSSProperties, useEffect, useState } from "react";
import { Container } from "./Container";
import { api } from "@/lib/api";
import { IService } from "@/types/auth";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function Services() {
  const [setserviceList, setSetserviceList] = useState<IService[]>([]);

  const fetchServices = async () => {
    const response = await api.get("/services");
    setSetserviceList(response.data);
  };

  useEffect(() => {
    fetchServices();
    return () => {
      const controller = new AbortController();
      controller.abort();
    };
  }, []);

  return (
    <section className="bg-white min-h-screen py-14 lg:py-28">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-4 lg:text-5xl">
          Servicios
        </h2>
        <p
          className="text-sm lg:text-base text-center mx-auto mt-4 lg:mt-6 max-w-2xl"
          style={{ textWrap: "balance" } as CSSProperties}
        >
          Experimenta la excelencia en cuidado masculino en nuestra barbería.
          Desde cortes clásicos hasta afeitados precisos, nuestros servicios
          fusionan habilidad artesanal con un ambiente acogedor. Descubre el
          arte de la barbería con nosotros.
        </p>
        <div className="max-w-[70rem]  mx-auto gap-8 mt-7 lg:mt-14 grid md:grid-cols-2 lg:grid-cols-3">
          {setserviceList?.map(
            ({ description, id, img, name, price, slug }) => (
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
                  <img src={img} className="w-full object-cover" alt="" />
                </picture>
                <div className="py-4 px-3 flex flex-col h-full">
                  <div className="flex justify-between gap-4 items-center">
                    <h3 className="font-bold">{name}</h3>
                    <span className="flex-shrink-0 bg-black p-1 px-2 rounded-md text-white">
                      $ {price.toFixed(2)}
                    </span>
                  </div>
                  <p
                    className="my-4"
                    style={{ textWrap: "balance" } as CSSProperties}
                  >
                    {description}
                  </p>
                  <Link
                    to={`/contact?service=${slug}`}
                    className="mt-auto block"
                  >
                    <Button className="bg-primary w-full">
                      Quiero atenderme
                    </Button>
                  </Link>
                </div>
              </article>
            )
          )}
        </div>
      </Container>
    </section>
  );
}
