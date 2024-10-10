// Properties 
interface Project {
  id: number;
  logo: string;
  name: string;
  slug: string;
}

export interface City {
  id: number;
  name: string;
  slug: string;
  image: string;
  projects: Project[];
}

// Our Partners 
export interface Partner {
  link: string;
  logo: string;
  ordering: number;
}
