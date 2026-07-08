import { MotionConfig } from "motion/react";
import { ThemeProvider } from "./context/ThemeContext";
import { CursorField } from "./components/CursorField";
import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { SignalMap } from "./sections/SignalMap";
import { Projects } from "./sections/Projects";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <div aria-hidden="true" className="aurora-field">
          <div className="aurora-blob" />
          <div className="aurora-blob" />
          <div className="aurora-blob" />
        </div>
        <CursorField />
        <Navbar />
        <main id="main-content">
          <Hero />
          <SignalMap />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </ThemeProvider>
  );
}
