import project1Img from '../assets/images/project1.png';
import project2Img from '../assets/images/project2.png';
import project3Img from '../assets/images/project3.jpg';
import project4Img from '../assets/images/project4.png';
import project5Img from '../assets/images/project5.jpeg';

export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveDemoUrl: string;
  coverImageUrl: string;
  featured: boolean;
}

export const projectData: Project[] = [
  {
    _id: '1',
    title: 'LearnSmart',
    description: 'A full-stack personalized learning platform built using the MERN stack that delivers an engaging learning experience with secure authentication, course management, and modern responsive UI.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    githubUrl: '',
    liveDemoUrl: '',
    coverImageUrl: project1Img,
    featured: true
  },
  {
    _id: '2',
    title: 'Employee Attendance Management System',
    description: 'A centralized attendance management system developed to simplify employee attendance tracking, record management, and reporting through an intuitive web interface.',
    techStack: ['PHP', 'MySQL', 'HTML', 'CSS'],
    githubUrl: '#',
    liveDemoUrl: '#',
    coverImageUrl: project2Img,
    featured: true
  },
  {
    _id: '3',
    title: 'GeoStamp Camera App',
    description: 'Android application that captures photographs with embedded GPS coordinates, location details and timestamps for accurate field documentation.',
    techStack: ['Java', 'Android Studio', 'XML', 'Google Maps API'],
    githubUrl: 'https://github.com/sanjana-1118/GeoStampCamera.git',
    liveDemoUrl: '',
    coverImageUrl: project5Img,
    featured: false
  },
  {
    _id: '4',
    title: 'CoinPrism',
    description: 'A responsive cryptocurrency dashboard displaying live market prices, trends and statistics using real-time APIs.',
    techStack: ['React', 'Tailwind CSS', 'JavaScript', 'REST APIs'],
    githubUrl: 'https://github.com/sanjana-1118/CryptoCurrency_Market_Dashboard.git',
    liveDemoUrl: 'https://crypto-currency-market-dashboard-exmntleul.vercel.app/',
    coverImageUrl: project3Img,
    featured: false
  },
  {
    _id: '5',
    title: 'React Jobs',
    description: 'A modern job portal interface built with reusable React components featuring responsive layouts and clean user experience.',
    techStack: ['React', 'Tailwind CSS', 'JavaScript'],
    githubUrl: 'https://github.com/sanjana-1118/react-crash-2026.git',
    liveDemoUrl: 'https://react-crash-2026-mu.vercel.app',
    coverImageUrl: project4Img,
    featured: false
  }
];
