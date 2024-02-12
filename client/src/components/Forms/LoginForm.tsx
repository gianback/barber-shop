import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster } from "@/components/ui/toaster";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LoginSchema, loginSchema } from "@/types/auth";
import { api } from "@/lib/api";
import Cookie from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user.store";

export function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const [responseMessage, setResponseMessage] = useState("");

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit } = form;

  const onSubmit = async (values: LoginSchema) => {
    try {
      setIsLoading(true);
      const { data } = await api.post("auth/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { token, name, surname, lastname } = data;
      setUser({ name, surname, lastname });
      Cookie.set("token", token);
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setResponseMessage(error.response.data.message);
      setTimeout(() => {
        setResponseMessage("");
      }, 2500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 w-[45rem] mx-auto max-w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            className="bg-primary mt-4 hover:bg-primary/80"
          >
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </Button>
          {responseMessage && (
            <p className="text-red-500">Credenciales Invalidas</p>
          )}
        </form>
      </Form>
      <Toaster />
    </>
  );
}
