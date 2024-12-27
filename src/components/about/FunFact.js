import React from "react";
import { BsTrophyFill } from "react-icons/bs";
import { SiAntdesign } from "react-icons/si";
import { BiCodeAlt } from "react-icons/bi";
import { IoLogoYoutube } from "react-icons/io";
import FunFactCard from "./FunFactCard";

const FunFact = () => {
  return (
    <div className="px-0 grid grid-cols-2 md:grid-cols-4 pb-10">
      <FunFactCard icon={<BsTrophyFill />} des="10 Certifications" />
      <FunFactCard icon={<SiAntdesign />} des="+20 Projets Achevés" />
      <FunFactCard icon={<BiCodeAlt />} des="100 heures de codes" />
      <FunFactCard icon={<IoLogoYoutube />} des="1.5k Subscription" />
    </div>
  );
};

export default FunFact;
