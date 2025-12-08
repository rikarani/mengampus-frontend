import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Nama lengkap wajib diisi"),
    email: z.email("Email tidak valid"),
    nim: z.string().min(1, "NIM wajib diisi").toUpperCase(),
    prodi: z.string().min(1, "Program studi wajib diisi"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    password_confirmation: z.string().min(8, "Konfirmasi password minimal 8 karakter"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Konfirmasi Password Tidak Sama",
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
