import React from "react";
import Title from "../home/Title";
import AboutMe from "./AboutMe";
import FunFact from "./FunFact";
import MyServices from "./MyServices";

const About = () => {
  return (
    <section id="about" className="w-full">
      <Title title="À propos de" subTitle="moi" />
      <AboutMe />
      <Title title="Mes" subTitle="Services" />
      <MyServices />
      <Title title="Fun" subTitle="Fact" />
      <FunFact />
    </section>
  );
};

export default About;
