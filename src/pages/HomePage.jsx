import React from "react";
import HeroSection from "../components/home/HeroSection.jsx";
import AboutSection from "../components/home/AboutSection.jsx";
import ChatbotSection from "../components/home/ChatBotSection.jsx";
import JurnalSection from "../components/home/JurnalSection.jsx";
import MakalahSection from "../components/home/MakalahSection.jsx";
import TestiSection from "../components/home/TestiSection.jsx";
import FaqSection from "../components/home/FaqSection.jsx";


function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ChatbotSection />
      <JurnalSection />
      <MakalahSection />
      <TestiSection />
      <FaqSection />
    </>
  );
}

export default HomePage;
