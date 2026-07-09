import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProfile, UserProfile } from '../services/profileService';

export const Education = () => {
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
      <section id="education" className="py-24 px-6 md:px-12 bg-muted/30">
        <div className="max-w-4xl mx-auto w-full">
          <div className="h-12 w-64 bg-muted rounded animate-pulse mb-16"></div>
          <div className="space-y-8">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-[1.5rem] animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="py-24 px-6 md:px-12 bg-muted/30 relative">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className=" text-5xl md:text-6xl text-foreground mb-16">Education</h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[2rem] shadow-soft p-8 md:p-12 border border-border"
        >
          <div className="space-y-12">
            {profile?.education?.map((edu, index) => (
              <div key={index} className="relative pl-8 md:pl-12 before:absolute before:left-[5px] before:top-3 before:bottom-[-3rem] before:w-[2px] before:bg-border last:before:hidden">
                <div className="absolute left-[0px] top-[8px] w-3 h-3 rounded-full bg-accent ring-4 ring-white"></div>
                <h3 className="text-2xl md:text-3xl text-foreground mb-2">{edu.degree}</h3>
                <p className="text-lg text-foreground/80 font-medium mb-4">{edu.institution}</p>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm tracking-wider font-semibold">
                  <span className="text-accent uppercase">{edu.period}</span>
                  {edu.cgpa && (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
                      <span className="bg-accent/10 text-accent px-3 py-1 rounded-md">CGPA: {edu.cgpa}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
