export type Event = {
  id: string;
  category_id: string;
  name: string;
  date: Date;
  description: string;
  location: string;
  created_at: Date;
  updated_at: Date;
  category: {
    id: string;
    name: string;
    slug: string;
    created_at: Date;
    updated_at: Date;
  };
};
