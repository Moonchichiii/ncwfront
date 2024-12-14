import { useQuery } from '@tanstack/react-query';
import apiClient from '@api/config';

interface Project {
  id: string;
  title: string;
  description?: string;
  image: string;
  tags: string[];
}

interface ProjectsResponse {
  results: Project[];
}

const fetchProjects = async (): Promise<ProjectsResponse> => {
  const response = await apiClient.get<ProjectsResponse>('/projects');
  return response.data;
};

const useProjects = () => {
  return useQuery<ProjectsResponse, Error>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
};


export default useProjects;
