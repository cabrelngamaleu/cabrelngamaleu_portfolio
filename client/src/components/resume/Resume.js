import React from "react";
import Title from "../home/Title";
import Education from "./Education";
import Skills from "./Skills";

const Resume = () => {
  return (
    <section id="resume">
      <Title title="Mon" subTitle="Résumé" />
      <Education />
      <Title title="Mes" subTitle="Compétences" />
      <Skills />
    </section>
  );
};

export default Resume;
