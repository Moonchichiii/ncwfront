// src/api/projects.ts
import apiClient from './config';

export const getProjects = async () => {
  const response = await apiClient.get('/projects');
  return response.data;
};

// Add more project-related API calls as needed
