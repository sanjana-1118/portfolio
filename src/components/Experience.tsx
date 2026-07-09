import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProfile, UserProfile } from '../services/profileService';
import { SectionHeader } from './ui/SectionHeader';

export const Experience = () => {
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
      <section id="experience" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto w-full">
          <div className="h-12 w-64 bg-muted rounded animate-pulse mb-16"></div>
          <div className="space-y-12">
            {[1, 2].map((i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3 h-6 bg-muted rounded animate-pulse"></div>
                <div className="w-full md:w-2/3 space-y-4">
                  <div className="h-8 w-3/4 bg-muted rounded animate-pulse"></div>
                  <div className="h-6 w-1/2 bg-muted rounded animate-pulse"></div>
                  <div className="h-24 w-full bg-muted rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="pb-12 md:pb-16 pt-2 md:pt-4 px-4 sm:px-6 md:px-12 bg-transparent relative z-10 -mt-6 md:-mt-10">
      <div className="max-w-6xl mx-auto w-full">
        
        <SectionHeader subtitle="Experience" title="Professional Journey" />
        
        <div className="bg-white px-4 sm:px-6 md:px-10 py-6 md:py-8 rounded-none shadow-soft border border-border/40 w-full">
          <div className="max-w-5xl mx-auto space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {profile?.experience?.map((exp, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                {/* Timeline Marker */}
                <div className="flex items-center justify-center w-8 h-8 rounded-none border-4 border-white bg-accent shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-soft absolute left-0 md:left-1/2 z-10 transition-transform group-hover:scale-110 duration-300">
                  <div className="w-1.5 h-1.5 bg-white rounded-none"></div>
                </div>
                
                {/* Content Card */}
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] ml-auto md:ml-0 p-6 rounded-none bg-background/50 border border-border/60 shadow-sm group-hover:shadow-md hover:border-border transition-all duration-300">
                  <div className="flex flex-col gap-1 mb-3">
                    <span className="text-accent font-medium text-xs tracking-wider uppercase">{exp.period}</span>
                    <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                    <span className="text-foreground/70 font-medium text-sm">{exp.company}</span>
                  </div>
                  <p className="text-foreground/80 leading-relaxed text-sm text-justify">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
