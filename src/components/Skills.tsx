import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { getProfile, UserProfile } from '../services/profileService';
import { SectionHeader } from './ui/SectionHeader';

const getIconUrl = (skillName: string) => {
  const map: Record<string, string> = {
    'Java': 'java/java-original',
    'Python': 'python/python-original',
    'JavaScript': 'javascript/javascript-original',
    'C': 'c/c-original',
    'C++': 'cplusplus/cplusplus-original',
    'HTML': 'html5/html5-original',
    'CSS': 'css3/css3-original',
    'React.js': 'react/react-original',
    'Tailwind CSS': 'tailwindcss/tailwindcss-original',
    'Node.js': 'nodejs/nodejs-original',
    'Express.js': 'express/express-original',
    'PHP': 'php/php-original',
    'MongoDB': 'mongodb/mongodb-original',
    'MySQL': 'mysql/mysql-original',
    'PostgreSQL': 'postgresql/postgresql-original',
    'Git': 'git/git-original',
    'GitHub': 'github/github-original',
    'VS Code': 'vscode/vscode-original',
    'Android Studio': 'androidstudio/androidstudio-original',
    'Linux': 'linux/linux-original',
    'Vercel': 'vercel/vercel-original',
    'SQL': 'sqldeveloper/sqldeveloper-original',
    'Figma': 'figma/figma-original'
  };
  
  const iconId = map[skillName];
  if (iconId) {
    return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconId}.svg`;
  }
  // fallback for generic ones if not in devicon
  return null;
};

export const Skills = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-6 md:px-12 bg-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="h-12 w-48 bg-muted rounded animate-pulse mb-12"></div>
          <div className="h-[400px] bg-muted rounded-[2rem] animate-pulse"></div>
        </div>
      </section>
    );
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section className="pb-12 md:pb-16 pt-2 md:pt-4 px-4 sm:px-6 md:px-12 bg-transparent relative z-10 -mt-6 md:-mt-10">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header Area */}
        <SectionHeader subtitle="Skills" title="Stack I Build With" />

        {/* Single Card Container */}
        <motion.div 
          className="bg-white p-4 sm:p-6 md:p-10 rounded-none shadow-soft border border-border/40 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {profile?.skills?.map((skillCategory, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="flex flex-col gap-4 bg-muted/10 p-5 rounded-none border border-border/40 h-full"
              >
                <h3 className="text-sm font-semibold text-foreground/90 uppercase tracking-wide pb-2 border-b border-border/50">
                  {skillCategory.category}
                </h3>
                
                <div className="flex flex-wrap gap-2.5">
                  {skillCategory.items.map((skill, idx) => {
                    const iconUrl = getIconUrl(skill);
                    return (
                      <motion.div 
                        key={idx} 
                        whileHover={{ y: -2 }}
                        className="bg-white flex items-center gap-2 px-3 py-1.5 rounded-none shadow-sm border border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-300 w-auto"
                      >
                        <div className="w-[14px] h-[14px] flex items-center justify-center shrink-0">
                          {iconUrl ? (
                            <img src={iconUrl} alt={skill} className="w-full h-full object-contain" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted text-foreground rounded-sm font-bold text-[7px]">
                              {skill.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <span className="text-[11px] font-medium text-foreground/80 whitespace-nowrap">
                          {skill}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
