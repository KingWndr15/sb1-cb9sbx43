export interface User {
  id: string;
  email: string;
  subdomain: string | null;
  created_at: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  description: string;
}