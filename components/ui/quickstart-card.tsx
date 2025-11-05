"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
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
  FieldDescription,
} from "@/components/ui/field";
import * as z from "zod";

const fileSizeLimit = 5 * 1024 * 1024; // 5MB
const fileSchema = z
  .file()
  .refine((file) => ["application/pdf"].includes(file.type), {
    message: "Invalid document file type",
  })
  .refine((file) => file.size <= fileSizeLimit, {
    message: "File size should not exceed 5MB",
  });

const linkedInRegex =
  /^https?:\/\/(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9._%~-]+\/?$/;
const githubRegex = /^https?:\/\/(?:www\.)?github\.com\/[A-Za-z0-9-]+\/?$/;

const schema = z.object({
  file: fileSchema,
  linkedin: z
    .string()
    .regex(linkedInRegex, { error: "Must be a valid LinkedIn URL." }),
  github: z
    .string()
    .regex(githubRegex, { error: "Must be a valid GitHub URL." }),
});

type Schema = z.infer<typeof schema>;

export function QuickStartCard() {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      linkedin: "",
      github: "",
    },
  });

  function onSubmit(data: Schema) {
    // here lets send our data to the api
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
        <Button type="submit" className="w-full" form="form">
          Create my CV
        </Button>
      </CardFooter>
    </Card>
  );
}
