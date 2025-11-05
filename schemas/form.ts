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

export const schema = z.object({
  file: fileSchema,
  linkedin: z
    .string()
    .regex(linkedInRegex, { error: "Must be a valid LinkedIn URL." }),
  github: z
    .string()
    .regex(githubRegex, { error: "Must be a valid GitHub URL." }),
});

export type Schema = z.infer<typeof schema>;
