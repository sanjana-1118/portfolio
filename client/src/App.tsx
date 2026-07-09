import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { Helmet } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Certificates } from './components/Certificates';
import { Footer } from './components/Footer';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Sanjana | Full Stack Developer</title>
        <meta name="description" content="Portfolio of Sanjana, a Full Stack Developer and MCA student." />
      </Helmet>
      
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main>
          <Hero />

          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certificates />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
