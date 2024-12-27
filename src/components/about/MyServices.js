import React from "react";
import { FaAppStoreIos } from "react-icons/fa";
import { AiTwotoneAppstore } from "react-icons/ai";
import { SiAntdesign } from "react-icons/si";
import { BiCodeAlt } from "react-icons/bi";
import ServicesCard from "./ServicesCard";

const MyServices = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <ServicesCard
        icons={<BiCodeAlt />}
        title="Développement WEB"
        subTitle="De la conception à l'intégration, jusqu’à la maintenance, j’offre des services de développement 
        d’applications web couvrant l’ensemble du cycle de vie. Je suis également en mesure de concevoir
         des applications sécurisées, évolutives, rapides et parfaitement compatibles avec tous les appareils et plateformes."
      />
      <ServicesCard
        icons={<SiAntdesign />}
        title="Website Designer"
        subTitle="J’utilise des outils et technologies avancés pour concevoir des sites web à la fois esthétiques et fonctionnels, 
        adaptés aux besoins spécifiques de votre entreprise. Faites-nous confiance pour vous accompagner dans la 
        réalisation de vos objectifs numériques."
      />
      <ServicesCard
        icons={<AiTwotoneAppstore />}
        title="Application Mobile"
        subTitle="Je conçois des designs modernes, développe un code de qualité supérieure et réalise des applications riches
         en fonctionnalités à des coûts abordables, couvrant divers environnements, notamment iOS, Android, 
         les solutions hybrides et multiplateformes."
      />
      <ServicesCard
        icons={<FaAppStoreIos />}
        title="SEO / Web Hosting"
        subTitle="Fort d’une expertise approfondie des algorithmes et technologies les plus récents, je propose des services
         de premier ordre pour aider les entreprises et les particuliers à accroître leur visibilité en ligne 
         et à optimiser leur présence sur le web."
      />
    </div>
  );
};

export default MyServices;
