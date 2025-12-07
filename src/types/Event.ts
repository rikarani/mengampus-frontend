import type { Category } from "./Category";

export type Event = {
  id: string;
  category_id: string;
  name: string;
  date: string;
  time: string;
  description: string;
  location: string;
  created_at: Date;
  updated_at: Date;
  category: Category;
};
