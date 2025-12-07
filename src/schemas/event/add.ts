import { z } from "zod";

export const addEventSchema = z.object({
  name: z.string().min(1, { error: "Nama event wajib diisi" }),
  category_id: z.string().min(1, { error: "Kategori event wajib diisi" }),
  date: z.iso.date({ error: "Tanggal event wajib diisi" }),
  time: z.iso.time({ error: "Waktu event wajib diisi" }),
  description: z.string().min(1, { error: "Deskripsi event wajib diisi" }),
  location: z.string().min(1, { error: "Lokasi event wajib diisi" }),
});

export type AddEventSchema = z.infer<typeof addEventSchema>;
