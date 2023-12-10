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
import { LoginSchema } from "@/types/auth";
import { z } from "zod";
import { api } from "@/lib/api";
import Cookie from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user.store";

export function LoginForm() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const [responseMessage, setResponseMessage] = useState("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit } = form;

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const { data } = await api.post("auth/login", values);
      const { token, name, surname } = data;
      console.log({ data });
      setUser({ name, surname });
      Cookie.set("token", token);
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setResponseMessage(error.data.message);
      setTimeout(() => {
        setResponseMessage("");
      }, 2500);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 min-w-[40rem]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-primary mt-4 hover:bg-primary/80">
            Enviar
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
