import ErrorBoundary from "../../components/common/ErrorBoundary";
import SEO from "../../components/common/SEO";
import Hero from "../../components/home/Hero";
import About from "../../components/home/About";
import Education from "../../components/home/Education";
import Skills from "../../components/home/Skills";
import Projects from "../../components/home/Projects";
import Resume from "../../components/home/Resume";
import Certificates from "../../components/home/Certificates";
import Contact from "../../components/home/Contact";
import Footer from "../../components/layout/Footer";

function Home() {
  return (
    <>
      <SEO
        title="Abhinav Adabala | Portfolio"
        description="Full-stack developer with expertise in React, Python, and web technologies. B.Tech CSE (AI & Data Science) student."
      />
      <ErrorBoundary>
        <main className="min-h-screen bg-[#080d1b] text-white">
          <Hero />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Resume />
          <Certificates />
          <Contact />
          <Footer />
        </main>
      </ErrorBoundary>
    </>
  );
}

export default Home;
