import { Container } from "@/components/Container";
import { ServiceForm } from "@/components/Forms/ServiceForm";

export function CreateService() {
  return (
    <main className={`bg-secondary min-h-[calc(100vh-6rem)] flex items-center`}>
      <Container>
        <h1 className="text-4xl text-center mb-8">Crea un nuevo servicio</h1>
        <ServiceForm />
      </Container>
    </main>
  );
}
