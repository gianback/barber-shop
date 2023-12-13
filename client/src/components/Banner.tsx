import banner from "@/assets/banner.png";
import styles from "@/styles/banner.module.css";
import { Container } from "./Container";
export function Banner() {
  return (
    <section
      className={`${styles.Banner} h-[calc(100vh-5rem)] lg:h-[calc(100vh-6rem)] overflow-hidden relative flex items-center justify-center`}
    >
      <div className="relative z-[5]">
        <Container>
          <h1 className="text-white text-3xl lg:text-5xl font-bold max-w-[35ch] mx-auto text-center">
            EL ESTILO ES UN REFLEJO DE TU ACTITUD Y TU PERSONALIDAD
          </h1>
          <p className="text-white text-base lg:text-3xl text-center mt-8">
            Horario de apertura: 09:00 a 18:00
          </p>
        </Container>
      </div>
      <picture className="absolute inset-0">
        <img className="w-full h-full object-cover" src={banner} alt="" />
      </picture>
    </section>
  );
}
