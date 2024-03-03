interface Category {
  name: string;
  selected: boolean;
}

export interface Categories {
  Movies: Category[];
  'TV Shows': Category[];
  Countries: Category[];
  'Capital Cities': Category[];
  Animals: Category[];
  Sports: Category[];
}
