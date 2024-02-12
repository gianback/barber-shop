import { Container } from "@/components/Container";
import { ContactForm } from "@/components/Forms/ContactForm";

export function Contact() {
  return (
    <main className="min-h-screen flex items-center bg-secondary py-8 lg:py-12">
      <Container className="items-center flex-col justify-center h-full flex-1">
        <h1 className="text-3xl lg:text-5xl text-white font-bold text-center">
          Pagina de contacto
        </h1>
        <ContactForm />
      </Container>
    </main>
  );
}
