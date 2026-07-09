import { profileData } from '../data/profile';

export interface UserProfile {
  name: string;
  tagline: string;
  about: string;
  journey: string;
  currentFocus: string[];
  skills: { category: string; items: string[] }[];
  experience: { title: string; company: string; period: string; description: string }[];
  education: { degree: string; institution: string; period: string; cgpa: string }[];
  socialLinks: { linkedin: string; github: string; email: string };
  resumeUrl: string;
  profileImage: string;
}

export const getProfile = async (): Promise<UserProfile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(profileData);
    }, 500);
  });
};
