import React from "react";
import ResumeTitle from "./ResumeTitle";
import { MdWork } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";
import ResumeCard from "./ResumeCard";

const Education = () => {
  return (
    <div className="w-full grid grid-cols-9 px-6">
      <div className="col-span-9 md:col-span-4">
        <ResumeTitle title="Expérience Professionnelle" icon={<MdWork />} />
        <ResumeCard
          badge="10/2018 - 08/2024"
          title="IT Manager"
          subTitle="Royal Grill Equipements SARL."
          des="Plus d'informations sur mon CV à télécharger"
        />
        <ResumeCard
          badge="07/2018 - 10/2018"
          title="Ingénieur Informaticien"
          subTitle="Sense SARL"
          des="Plus d'informations sur mon CV à télécharger"
        />
        <ResumeCard
          badge="04/2017 - 08/2017"
          title="Stagiaire Académique"
          subTitle="Camwater "
          des="Plus d'informations sur mon CV à télécharger"
        />
        <ResumeCard
          badge="01/2017 - 03/2017"
          title="Développeur Web / Télécoms."
          subTitle="Bloosat Cameroon "
          des="Plus d'informations sur mon CV à télécharger"
        />
        <ResumeCard
          badge="07/2016 - 10/2016"
          title="Stagiaire Développeur web"
          subTitle="Digital Cloud Sercive"
          des="Plus d'informations sur mon CV à télécharger"
        />
        <ResumeCard
          badge="08/2013 - 11/2013"
          title="Stagiaire Académique Réseau Télécoms."
          subTitle="1st Trust Cameroon"
          des="Plus d'informations sur mon CV à télécharger"
        />
      </div>
      <div className="w-full h-full hidden lgl:flex justify-center items-center">
        <span className="w-[1px] h-full bg-zinc-800 inline-flex"></span>
      </div>
      <div className="col-span-9 md:col-span-4">
        <ResumeTitle title="Education" icon={<GiGraduateCap />} />
        <ResumeCard
          badge="2016 - 2017"
          title="Université Protestante d'Afrique Centrale (UPAC)"
          subTitle="Master 2 - Génie Logiciel"
          des="Major Promotion - Moyenne Pondérée : 3.13/4.00"
        />
        <ResumeCard
          badge="2015 - 2016"
          title="Université Protestante d'Afrique Centrale (UPAC)"
          subTitle="Master 1 - Génie Logiciel"
          des=""
        />
        <ResumeCard
          badge="2010 - 2015"
          title="Université des Montagnes (UdM)"
          subTitle="Licence Professionnelle"
          des="Spécialité - Télécommunications et Réseaux/ Informatique et Réseaux"
        />
        <ResumeCard
          badge="2009 - 2010"
          title="Collège VOGT"
          subTitle="Baccalauréat"
          des="Mention - Bien"
        />
      </div>
    </div>
  );
};

export default Education;
