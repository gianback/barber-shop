import { Container } from "@/components/Container";
import { RegisterForm } from "@/components/RegisterForm";

export function Register() {
  return (
    <main className="flex bg-secondary flex-col justify-center h-screen">
      <Container>
        <h1 className="text-center text-2xl lg:text-5xl mb-8">
          Crea tu cuenta
        </h1>
        <RegisterForm />
      </Container>
    </main>
  );
}
