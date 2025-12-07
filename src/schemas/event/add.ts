import { z } from "zod";

export const addEventSchema = z.object({
  name: z.string().min(1, "Nama event wajib diisi"),
  date: z.string().min(1, "Tanggal event wajib diisi"),
  category: z.string().min(1, "Kategori event wajib diisi"),
  description: z.string().min(1, "Deskripsi event wajib diisi"),
  location: z.string().min(1, "Lokasi event wajib diisi"),
});

export type AddEventSchema = z.infer<typeof addEventSchema>;
