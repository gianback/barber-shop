import { Container } from "@/components/Container";
import { LoginForm } from "@/components/Forms/LoginForm";

export function Login() {
  return (
    <main className="flex bg-secondary flex-col justify-center h-screen">
      <Container>
        <h1 className="text-center text-2xl lg:text-5xl mb-8 text-white">
          Inicia Sesión
        </h1>
        <LoginForm />
      </Container>
    </main>
  );
}
