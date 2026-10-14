import { FaReact, FaNodeJs, FaDocker, FaGitAlt, FaPython, FaJava } from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiExpress,
  SiNextdotjs,
  SiRedux,
  SiGraphql,
  SiKubernetes,
} from 'react-icons/si';

export const skillsData = {
  frontend: [
    { name: 'React', icon: FaReact, level: 90 },
    { name: 'JavaScript', icon: SiJavascript, level: 95 },
    { name: 'TypeScript', icon: SiTypescript, level: 85 },
    { name: 'Next.js', icon: SiNextdotjs, level: 80 },
    { name: 'Tailwind CSS', icon: SiTailwindcss, level: 90 },
    { name: 'Redux', icon: SiRedux, level: 85 },
  ],
  backend: [
    { name: 'Node.js', icon: FaNodeJs, level: 90 },
    { name: 'Express', icon: SiExpress, level: 88 },
    { name: 'MongoDB', icon: SiMongodb, level: 85 },
    { name: 'PostgreSQL', icon: SiPostgresql, level: 80 },
    { name: 'GraphQL', icon: SiGraphql, level: 75 },
    { name: 'Python', icon: FaPython, level: 70 },
    { name: 'Java', icon: FaJava, level: 75 },
  ],
  tools: [
    { name: 'Git', icon: FaGitAlt, level: 95 },
    { name: 'Docker', icon: FaDocker, level: 85 },
    { name: 'Kubernetes', icon: SiKubernetes, level: 70 },
  ],
};
