import { z } from "zod";

export const loginSchema = z.object({
  nim: z.string().min(1, "NIM wajib diisi").toUpperCase(),
  password: z.string().min(1, "Wajib Diisi"),
  role: z.enum(["admin", "user"], "Role wajib dipilih"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
