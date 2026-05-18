import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AnimationEngine from "./components/AnimationEngine";

export default function Home() {
  return (
    <>
      {/* JS Animation Engine — purely side-effect */}
      <AnimationEngine />

      {/* Background Orbs */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />

        <div className="divider" />

        <Skills />

        <div className="divider" />

        <Portfolio />

        <div className="divider" />

        <About />

        <div className="divider" />

        <Experience />

        <div className="divider" />

        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
