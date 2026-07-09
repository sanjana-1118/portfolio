import { projectData } from '../data/projects';

export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  coverImageUrl: string;
  featured: boolean;
}

export const getProjects = async (): Promise<Project[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(projectData);
    }, 500);
  });
};
