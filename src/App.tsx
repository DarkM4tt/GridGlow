import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
// import Services from "./pages/Services/Services";
// import Contact from "./pages/Contact/Contact";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/services" element={<Services />} /> */}
        {/* <Route path="/services/design" element={<Services />} /> */}
        {/* <Route path="/services/development" element={<Services />} /> */}
        <Route path="/about" element={<About />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
