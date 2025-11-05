"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { schema, Schema } from "@/schemas/form";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { uploadAndProcess } from "@/lib/upload";
import { Spinner } from "./spinner";

export function QuickStartCard() {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      linkedin: "",
      github: "",
    },
  });

  const { isPending, error, mutate } = useMutation(
    {
      mutationFn: uploadAndProcess,
      onSuccess: () => {},
    },
    new QueryClient()
  );

  function onSubmit(data: Schema) {
    // here lets send our data to the api
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("linkedin", data.linkedin);
    formData.append("github", data.github);

    mutate(formData);
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Lets create your CV</CardTitle>
        <CardDescription>
          Enter the details below, and we can get that CV made in no time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <FieldGroup>
              <Controller
                name="file"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-title">
                      Existing Resume / CV
                    </FieldLabel>
                    <Input
                      id="form-field"
                      aria-invalid={fieldState.invalid}
                      type="file"
                      accept="application/pdf"
                      onChange={(event) =>
                        field.onChange(
                          event.target.files && event.target.files[0]
                        )
                      }
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="linkedin"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-linkedin">
                      LinkedIn Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-linkedin"
                      placeholder="https://linkedin.com/in/samuel.stubbings..."
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="github"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-github">
                      GitHub Profile
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-github"
                      placeholder="https://github.com/samuel.stubbings..."
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full"
          form="form"
          disabled={isPending}
        >
          {isPending && <Spinner />}
          Create my CV
        </Button>
      </CardFooter>
    </Card>
  );
}
