import React, { useState } from "react";
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import About from "./component/About";
import Services from "./component/Services";
import Work from "./component/Work";
import Company from "./component/Company";
import Contact from "./component/Contact";
import Footer from "./Footer";
import Skills from "./component/Skills";
import Loading from "./component/Loading";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <main className="bg-[#0F0F13] selection:bg-purple-500/30">
      {loading ? (
        <Loading onFinish={() => setLoading(false)} />
      ) : (
        <div id="smooth-wrapper">
          <Navbar />
          <div id="smooth-content">
            <Hero />
            <About />
            <Skills />
            <Services />
            <Work />
            <Company />
            <Contact />
            <Footer />
          </div>
        </div>
      )}
    </main>
  );
};

export default App;