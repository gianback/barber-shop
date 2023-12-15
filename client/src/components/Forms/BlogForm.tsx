import { api } from "@/lib/api";
import { CreateBlogSchema, createBlogSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Dropzone, ExtFile, FileMosaic } from "@files-ui/react";

export function BlogForm() {
  const [responseMessage, setResponseMessage] = useState("");
  const [imageError, setImageError] = useState("");
  const [files, setFiles] = useState<ExtFile[]>([]);
  const updateFiles = (incommingFiles: ExtFile[]) => {
    setFiles(incommingFiles);
    //even your own upload implementation
  };
  const form = useForm<CreateBlogSchema>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "",
      content: "",
      description: "",
    },
  });
  const { handleSubmit } = form;

  const onSubmit = async (values: CreateBlogSchema) => {
    try {
      await api.post("/posts", values);

      toast.success("Blog creado!", {
        duration: 20000,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setResponseMessage(error.data.message);
      setTimeout(() => {
        setResponseMessage("");
      }, 2500);
    }
  };

  //   const handleSuccessRegister = () => {
  //     navigate("/login");
  //   };
  const removeFile = () => {
    setFiles([]);
  };
  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 lg:min-w-[40rem]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Titulo del blog</FormLabel>
                <FormControl>
                  <Input
                    type="text"
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Descripcion del Blog
                </FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Garcia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Contenido del blog</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Perez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <label className="text-white">Imagen del bog</label>
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

          <Button className="bg-primary mt-4 hover:bg-primary/80">
            Enviar
          </Button>
          {responseMessage && (
            <p className="text-red-500">Credenciales Invalidas</p>
          )}
        </form>
      </Form>
      <Toaster richColors />
    </>
  );
}
