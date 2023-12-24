import { api } from "@/lib/api";
import { CreateBlogSchema, createBlogSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import sanitizeHtml from "sanitize-html";
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Textarea } from "../ui/textarea";
import { Spinner } from "../Spinner";

export function BlogForm() {
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setSetIsLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [files, setFiles] = useState<ExtFile[]>([]);
  const formWasReseted = useRef(false);
  const updateFiles = (incommingFiles: ExtFile[]) => {
    setFiles(incommingFiles);
    if (incommingFiles.length === 0) {
      setImageError("Debes subir una imagen");
    } else {
      setImageError("");
    }
  };

  const form = useForm<CreateBlogSchema>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "",
      content: "",
      description: "",
    },
  });
  const { handleSubmit, reset } = form;

  const onSubmit = async (values: CreateBlogSchema) => {
    if (files.length === 0) {
      setImageError("Debes subir una imagen");
      return;
    }

    const form = new FormData();
    for (const key in values) {
      form.append(key, values[key as keyof CreateBlogSchema]);
    }
    form.append("img", files[0].file as File);
    try {
      setSetIsLoading(true);
      await api.post("/posts", form);

      toast.success("Blog creado!", {
        duration: 20000,
      });
      formWasReseted.current = true;
      reset();
      setFiles([]);
      setTimeout(() => {
        formWasReseted.current = false;
      }, 2000);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setResponseMessage(error.data.message);
      setTimeout(() => {
        setResponseMessage("");
      }, 2500);
    } finally {
      setSetIsLoading(false);
    }
  };

  const removeFile = () => {
    setFiles([]);
    setImageError("Debes subir una imagen");
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 py-8 lg:min-w-[40rem]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Titulo del blog</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Titulo blog" {...field} />
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
                  <Textarea
                    style={{ resize: "none" }}
                    placeholder="Descripción blog"
                    {...field}
                  />
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
                  <ReactQuill
                    {...field}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(value, delta: any) =>
                      delta.ops[0].delete && !formWasReseted.current
                        ? field.onChange("")
                        : field.onChange(sanitizeHtml(value))
                    }
                    className="text-white max-w-[40rem]"
                    theme="snow"
                  />
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
            {isLoading ? <Spinner /> : "Enviar"}
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
