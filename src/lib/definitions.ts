export interface Image {
  id: number;
  mime: string;
  file_name: string;
  url: string;
}

export interface Idea {
  id: number;
  slug: string;
  title: string;
  content: string;
  published_at: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  small_image: Image[] | null;
  medium_image: Image[] | null;
}

interface MetaLinks {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLinks[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface IdeaResponse {
  data: Idea[];
  links: Links;
  meta: Meta;
}
