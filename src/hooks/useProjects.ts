import { useQuery } from '@tanstack/react-query';
import apiClient from '@api/config';

interface Project {
  id: number;
  title: string;
  location: string;
  services: string;
  year: string;
  description: string;
  category: string;
  link: string;
  featured: boolean;
  image?: string;
  external_link?: string;
}

interface ProjectsResponse {
  results: Project[];
}

interface UseProjectsOptions {
  category?: string;
  featured?: boolean;
}

const fetchProjects = async (options: UseProjectsOptions = {}): Promise<ProjectsResponse> => {
  const params = new URLSearchParams();
  
  if (options.category) params.append('category', options.category);
  if (options.featured) params.append('featured', 'true');
  
  const response = await apiClient.get<ProjectsResponse>('/projects/', { params });
  return response.data;
};

const useProjects = (options: UseProjectsOptions = {}) => {
  return useQuery<ProjectsResponse, Error>({
    queryKey: ['projects', options],
    queryFn: () => fetchProjects(options),
  });
};

export default useProjects;
export type { Project };
