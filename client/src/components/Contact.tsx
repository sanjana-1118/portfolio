import { useEffect, useState } from 'react';
import { getProfile, UserProfile } from '../services/profileService';
import { Check } from 'lucide-react';

export const Contact = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getProfile().then(setProfile).catch(console.error);
  }, []);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!profile?.socialLinks?.email) return;

    // Copy to clipboard
    navigator.clipboard.writeText(profile.socialLinks.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    // Open Gmail compose in new tab to bypass broken OS mail handlers
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.socialLinks.email}`, '_blank');
  };

  return (
    <section id="contact" className="py-12 md:py-16 px-6 md:px-12 bg-foreground text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-full h-full max-w-3xl opacity-10 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-accent rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-3xl mx-auto w-full text-center relative z-10 py-8">
        <h2 className="text-4xl md:text-5xl font-serif mb-6 text-white leading-tight tracking-tight">
          Let's create something <span className="text-accent">extraordinary.</span>
        </h2>
        
        <p className="text-white/70 text-base max-w-lg mx-auto mb-10 leading-relaxed">
          I'm always open to discussing new projects, creative ideas, or opportunities to bring your vision to life.
        </p>
        
        {profile?.socialLinks?.email && (
          <a 
            href={`mailto:${profile.socialLinks.email}`} 
            onClick={handleEmailClick}
            className="group inline-flex items-center gap-3 text-base font-medium bg-white text-foreground px-6 py-3 rounded-none hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 min-w-[180px] justify-center"
          >
            {copied ? (
              <Check size={20} className="text-green-600" />
            ) : (
              <svg className="text-[#EA4335] group-hover:text-white transition-colors" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
            <span>{copied ? 'Email Copied!' : 'Get in touch'}</span>
          </a>
        )}
      </div>
    </section>
  );
};
