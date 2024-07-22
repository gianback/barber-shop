import { CSSProperties, useEffect, useState } from "react";
import { IService } from "@/types/service";
import { fetchGetServices } from "@/services/services.service";
import { Container, ServiceCard } from ".";

export function Services() {
  const [setserviceList, setSetserviceList] = useState<IService[]>([]);

  const getServices = async () => {
    const response = await fetchGetServices();
    setSetserviceList(response.data);
  };

  useEffect(() => {
    getServices();
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
        <div className="mx-auto gap-8 mt-7 lg:mt-14 grid md:grid-cols-2 lg:grid-cols-3">
          {setserviceList?.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
