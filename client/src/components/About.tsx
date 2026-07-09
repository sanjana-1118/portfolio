import { useEffect, useState } from 'react';
import { getProfile, UserProfile } from '../services/profileService';

import { SectionHeader } from './ui/SectionHeader';

export const About = () => {
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
      <section id="about" className="py-24 px-6 md:px-12 flex items-center justify-center bg-transparent">
        <div className="max-w-6xl mx-auto w-full">
          <div className="h-[500px] w-full bg-muted rounded-[2rem] animate-pulse"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-12 md:py-16 px-4 sm:px-6 md:px-12 flex items-center justify-center bg-transparent relative z-20 -mt-10 md:-mt-20 lg:-mt-28">
      <div className="max-w-6xl mx-auto w-full flex justify-center">
        
        <div className="bg-white rounded-none shadow-soft p-6 sm:p-8 md:p-14 w-full">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {/* Left Column: About */}
            <div className="flex flex-col">
              <SectionHeader subtitle="About" title="About Me" className="mb-8" />
              
              <div className="prose prose-base text-foreground/80 font-light leading-relaxed">
                {profile?.about?.split('\n')?.map((paragraph, idx) => (
                  <p key={idx} className="mb-5 text-justify" dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
                {!profile?.about && (
                  <p className="text-justify">I am a passionate Full Stack Developer focused on crafting elegant and highly functional web applications.</p>
                )}
              </div>
            </div>

            {/* Right Column: Tabs & Education */}
            <div className="flex flex-col">
              {/* Fake Tabs for visual matching */}
              <div className="flex items-center gap-8 border-b border-border/50 pb-4 mb-8">
                <button className="text-foreground/50 font-medium pb-4 -mb-[17px] border-b-2 border-transparent hover:text-foreground transition-colors">
                  About Me
                </button>
                <button className="text-foreground font-medium pb-4 -mb-[17px] border-b-2 border-accent transition-colors">
                  Education
                </button>
              </div>

              {/* Education Timeline */}
              <div className="flex flex-col gap-8 mt-2">
                {profile?.education?.map((edu, index) => (
                  <div key={index} className="relative pl-8 before:absolute before:left-[4px] before:top-[22px] before:bottom-[-2rem] before:w-[1px] before:bg-border last:before:hidden">
                    <div className="absolute left-0 top-[6px] w-[9px] h-[9px] rounded-full bg-accent ring-[4px] ring-white"></div>
                    <h3 className="text-[15px] font-semibold text-foreground mb-1">{edu.degree}</h3>
                    <p className="text-sm text-foreground/70 mb-1">{edu.institution}</p>
                    <p className="text-[13px] text-muted-foreground flex items-center gap-2">
                      {edu.period} {edu.cgpa && <><span className="w-1 h-1 rounded-full bg-border"></span> <span className="text-foreground/80 font-medium">CGPA: {edu.cgpa}</span></>}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
