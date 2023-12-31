import { Container } from "@/components/Container";
import { ServiceForm } from "@/components/Forms/ServiceForm";

export function CreateService() {
  return (
    <main
      className={`bg-secondary min-h-[calc(100vh-5.75rem)] flex items-center`}
    >
      <Container>
        <h1 className="text-4xl text-center mb-8 text-white">
          Crea un nuevo servicio
        </h1>
        <ServiceForm />
      </Container>
    </main>
  );
}
