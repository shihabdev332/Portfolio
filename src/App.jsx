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
    <>
      {loading && <Loading onFinish={() => setLoading(false)} />}
      {!loading && (
        <div>
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Services />
          <Work />
          <Company />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
