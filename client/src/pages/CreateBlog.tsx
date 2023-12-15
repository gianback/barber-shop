import { Container } from "@/components/Container";
import { BlogForm } from "@/components/Forms/BlogForm";

export function CreateBlog() {
  return (
    <main
      className={`bg-secondary min-h-[calc(100vh-5.75rem)] flex items-center`}
    >
      <Container>
        <h1 className="text-4xl text-center mb-8 text-white">
          Crea un nuevo blog
        </h1>
        <BlogForm />
      </Container>
    </main>
  );
}
