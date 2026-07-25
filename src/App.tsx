import { useLenis } from '@/hooks/useLenis';
import CustomCursor from '@/components/UI/CustomCursor';

import AnimatedBackground from '@/components/UI/AnimatedBackground';
import ScrollProgress from '@/components/UI/ScrollProgress';
import CommandPalette from '@/components/UI/CommandPalette';
import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import Hero from '@/components/Hero/Hero';

import About from '@/components/About/About';
import Skills from '@/components/Skills/Skills';
import Projects from '@/components/Projects/Projects';
import Education from "@/components/Experience/Education";
import Achievements from '@/components/Achievements/Achievements';

import AIChat from '@/components/AIChat/AIChat';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

function App() {
  useLenis();

  return (
    <>
      
      <CustomCursor />
      <AnimatedBackground />
      <ScrollProgress />
      <CommandPalette />
      <Navbar />
      <Sidebar />

      <main className="relative z-10 md:ml-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
        
        
      
        <AIChat />
        <Contact />
      </main>

      <div className="md:ml-20">
        <Footer />
      </div>
    </>
  );
}

export default App;
