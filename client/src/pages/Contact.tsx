import { Container } from "@/components/Container";
import { ContactForm } from "@/components/Forms/ContactForm";

export function Contact() {
  return (
    <main className="min-h-[calc(100vh-92px)] flex items-center bg-secondary lg:py-12">
      <Container className="items-center flex-col justify-center h-full flex-1">
        <h1 className="text-3xl lg:text-5xl text-white font-bold text-center mb-6 lg:mb-16">
          Pagina de contacto
        </h1>
        <ContactForm />
      </Container>
    </main>
  );
}
