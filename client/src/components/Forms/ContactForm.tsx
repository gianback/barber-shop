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
import { api } from "@/lib/api";
import Cookie from "js-cookie";
import { FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserStore } from "@/store/user.store";
import { Calendar as CalendarIcon } from "lucide-react";
import { ContactInterface, zodContactSchema } from "@/types/contact";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "../Spinner";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const hours = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

const temporalServices = [
  {
    name: "Corte de cabello",
    value: "corte-de-cabello",
  },
  {
    name: "Afeitado de barba",
    value: "afeitado-de-barba",
  },
  {
    name: "Corte de cabello y barba",
    value: "corte-de-cabello-y-barba",
  },
];
export function ContactForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const [responseMessage, setResponseMessage] = useState("");
  const [searchParams] = useSearchParams();
  const form = useForm<ContactInterface>({
    resolver: zodResolver(zodContactSchema),
    defaultValues: {
      name: "",
      surname: "",
      lastname: "",
      service: searchParams.get("service") || "",
      date: undefined,
      hour: "",
    },
  });
  const { handleSubmit } = form;
  // const handletest = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const stripe = await stripePromise;
  //   const response = await fetch("http://localhost:3000/v1/api/payments", {
  //     method: "POST",
  //   });
  //   const { session } = await response.json();
  //   // window.location.href = session.url;
  //   if (stripe === null) return;
  //   // When the customer clicks on the button, redirect them to Checkout.
  //   console.log(session);
  //   const result = await stripe.redirectToCheckout({
  //     sessionId: session.id,
  //   });
  //   if (result.error) {
  //     console.error(result.error);
  //   }
  // };
  const onSubmit = async (values: ContactInterface) => {
    console.log({ values });

    return;
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
      setResponseMessage(error.data.message);
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Nombre</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Apellido Materno</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Apellido Paterno</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Garcia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white block mb-2">
                    Fecha de la cita
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={`${
                            !field.value && "text-muted-foreground"
                          } w-full justify-start text-left font-normal`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Elige un dia</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          lang="es"
                          onSelect={field.onChange}
                          disabled={(datePick) =>
                            datePick.getTime() < new Date().setHours(0, 0, 0, 0)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Elige la hora</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Hora" />
                      </SelectTrigger>
                      <SelectContent>
                        {hours.map((hour) => (
                          <SelectItem key={hour} value={hour}>
                            {hour}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Elige tu servicio</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={searchParams.get("service") || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {temporalServices.map(({ name, value }) => (
                        <SelectItem key={name} value={value}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            className="bg-primary mt-4 hover:bg-primary/80"
          >
            {isLoading ? <Spinner /> : "Ir al checkout"}
          </Button>
          {responseMessage && (
            <p className="text-red-500">Credenciales Invalidas</p>
          )}
        </form>
      </Form>
      {/* <form onSubmit={handletest}>
        <button>submit</button>
      </form> */}
      <Toaster />
    </>
  );
}
