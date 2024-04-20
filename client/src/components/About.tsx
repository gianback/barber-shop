import { Container } from "./Container";

export function About() {
  return (
    <section className="bg-secondary h-screen">
      <Container className="grid lg:grid-cols-2 place-items-center">
        <ul className="grid lg:grid-cols-2 [&>li>img]:object-cover">
          <li className="flex justify-end lg:translate-y-4 relative z-[2] w-full">
            <img
              src="../../src/assets/about-1.jpg"
              alt="Imagen hombre haciendo un corte de cabello"
            />
          </li>
          <li className="hidden lg:flex items-end row-span-2  -translate-x-8">
            <img
              src="../../src/assets/about-3.jpg"
              alt="Imagen hombre haciendo un corte de cabello"
            />
          </li>
          <li className="hidden lg:block -translate-x-16 -translate-y-6">
            <img
              src="../../src/assets/about-2.jpg"
              alt="Imagen hombre haciendo un corte de cabello"
            />
          </li>
        </ul>
        <div className="mt-8 lg:mt-0 [&>p]:text-sm lg:[&>p]:text-base">
          <h2 className="text-white text-2xl lg:text-4xl font-bold mb-16">
            Sobre nosotros
          </h2>
          <p className="text-white">
            En nuestra barbería, nos apasiona crear experiencias únicas para
            cada cliente. Más allá de ser expertos en el arte de cortar cabello,
            somos un espacio que celebra la autenticidad y la individualidad.
            Desde nuestra apertura, hemos cultivado un ambiente acogedor donde
            nuestro talentoso equipo se destaca por su habilidad técnica y
            compromiso con las preferencias únicas de cada persona.
          </p>
          <p className="mt-5 lg:mt-10 text-white">
            Fusionamos técnicas clásicas con las últimas tendencias para ofrecer
            un servicio personalizado que refleje la personalidad de cada
            cliente. En nuestra barbería, no solo transformamos cabellos, sino
            que construimos relaciones auténticas con la comunidad. Estamos
            dedicados a elevar el estándar en el arte del cuidado capilar,
            creando un espacio acogedor donde todos salen con la confianza de
            lucir su mejor versión.
          </p>
        </div>
      </Container>
    </section>
  );
}
