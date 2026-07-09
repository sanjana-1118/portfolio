import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Opacity change on scroll
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = NAV_ITEMS.map((item) => item.name.toLowerCase());
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is near the top of the viewport
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActive(section);
            return;
          }
        }
      }
      
      // If at the very top (hero), clear active indicator since Home isn't in nav
      if (window.scrollY < 100) {
        setActive('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl transition-all duration-300">
      <nav
        className={`px-2 py-2 rounded-full transition-all duration-300 border border-border/50 ${
          scrolled ? 'bg-white/90 shadow-card backdrop-blur-md' : 'bg-white/40 shadow-soft backdrop-blur-sm'
        }`}
      >
        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center justify-between relative">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.name.toLowerCase();
            return (
              <li key={item.name} className="relative">
                <a
                  href={item.href}
                  onClick={() => setActive(item.name.toLowerCase())}
                  className={`relative z-10 block px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-accent-foreground' : 'text-foreground hover:text-accent'
                  }`}
                >
                  {item.name}
                </a>
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-accent rounded-full -z-0"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex justify-between items-center px-4 py-1">
          <span className=" text-lg font-bold">Sanjana</span>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-foreground focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-lg rounded-2xl shadow-card border border-border overflow-hidden md:hidden"
        >
          <ul className="flex flex-col py-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
};
