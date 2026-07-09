import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCertificates, Certificate } from '../services/certificateService';
import { SectionHeader } from './ui/SectionHeader';
import { X, ExternalLink } from 'lucide-react';

export const Certificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await getCertificates();
        setCertificates(data);
      } catch (error) {
        console.error("Failed to fetch certificates", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedCert]);

  if (loading) {
    return (
      <section id="certificates" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="h-12 w-64 bg-muted rounded animate-pulse mb-16"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/3] bg-muted rounded-[1.5rem] animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (certificates.length === 0) {
    return null; // Don't render section if no certificates
  }

  return (
    <section id="certificates" className="pb-12 md:pb-16 pt-2 md:pt-4 px-4 sm:px-6 md:px-12 bg-muted/30 relative z-10 -mt-6 md:-mt-10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeader subtitle="Certificates" title="Certifications" className="mb-0" />
          <p className="text-muted-foreground font-medium max-w-md">
            Continuous learning and official recognitions of my technical proficiencies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              layoutId={`cert-container-${cert._id}`}
              key={cert._id}
              onClick={() => setSelectedCert(cert)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer rounded-none bg-white border border-border shadow-sm hover:shadow-card hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden"
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-muted">
                <motion.img 
                  layoutId={`cert-image-${cert._id}`}
                  src={cert.previewImageUrl} 
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-sm text-foreground p-3 rounded-none translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className=" text-lg font-bold text-foreground mb-2 line-clamp-2">{cert.title}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-medium text-muted-foreground">{cert.issuingOrganization}</span>
                  <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded-none">{cert.issueDate}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 cursor-pointer"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 pointer-events-none">
              <motion.div
                layoutId={`cert-container-${selectedCert._id}`}
                className="w-full max-w-5xl bg-white rounded-none overflow-hidden flex flex-col shadow-2xl pointer-events-auto relative max-h-[90vh]"
              >
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <a 
                    href={selectedCert.certificateImageUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-10 h-10 bg-black/50 hover:bg-black/80 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-colors"
                    title="Open original"
                  >
                    <ExternalLink size={18} />
                  </a>
                  <button 
                    onClick={() => setSelectedCert(null)}
                    className="w-10 h-10 bg-black/50 hover:bg-black/80 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="w-full h-full overflow-y-auto p-2 bg-muted/20 flex items-center justify-center">
                  <motion.img 
                    layoutId={`cert-image-${selectedCert._id}`}
                    src={selectedCert.certificateImageUrl} 
                    alt={selectedCert.title} 
                    className="max-w-full max-h-full object-contain rounded-xl shadow-card"
                  />
                </div>
                
                <div className="p-6 bg-white border-t border-border shrink-0">
                  <h3 className=" text-2xl md:text-3xl text-foreground mb-2">{selectedCert.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <span className="text-foreground/80 font-medium">Issued by <span className="text-foreground">{selectedCert.issuingOrganization}</span></span>
                    <span className="text-muted-foreground font-medium text-sm">Date: {selectedCert.issueDate}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
