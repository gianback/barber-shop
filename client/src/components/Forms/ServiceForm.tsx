import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Dropzone, ExtFile, FileMosaic } from "@files-ui/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Toaster, toast } from "sonner";
import { CreateServiceSchema, createServiceSchema } from "@/types/auth";
import { api } from "@/lib/api";

export function ServiceForm() {
  const [imageError, setImageError] = useState("");
  const [files, setFiles] = useState<ExtFile[]>([]);
  const updateFiles = (incommingFiles: ExtFile[]) => {
    setFiles(incommingFiles);
    //even your own upload implementation
  };
  const removeFile = () => {
    setFiles([]);
  };
  const form = useForm<CreateServiceSchema>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      description: "",
      name: "",
      price: 0,
    },
  });

  const { handleSubmit, reset } = form;
  const onSubmit = async (values: CreateServiceSchema) => {
    if (files.length === 0) {
      setImageError("Debes subir una imagen");
      setTimeout(() => {
        setImageError("");
      }, 2500);
      return;
    }
    const formData = new FormData();

    for (const key in values) {
      formData.append(
        key,
        values[key as keyof CreateServiceSchema] as keyof CreateServiceSchema
      );
    }

    formData.set("img", files[0].file as File);

    try {
      const { data } = await api.post("services", formData);
      reset();
      setFiles([]);
      toast.success(data.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-4  lg:min-w-[40rem]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Nombre del servicio
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Corte de cabello"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Descricion del servicio
                </FormLabel>
                <FormControl>
                  <Textarea
                    style={{ resize: "none" }}
                    placeholder="Corte de cabello que ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <label className="text-white">Imagen del servicio</label>
          <Dropzone onChange={updateFiles} value={files} required name="img">
            {files.map((file, index) => (
              <FileMosaic
                name="img"
                key={index}
                {...file}
                onDelete={removeFile}
                info
              />
            ))}
          </Dropzone>
          {imageError && <p className="text-red-500">{imageError}</p>}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Precio del servicio
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                    type="number"
                    placeholder="9999.99"
                    className="appearance-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-primary mt-4 hover:bg-primary/80">
            Enviar
          </Button>
        </form>
      </Form>
      <Toaster richColors />
    </>
  );
}
