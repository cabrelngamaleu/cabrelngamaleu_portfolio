import React from "react";

const AboutMe = () => {
  return (
    <div className="flex flex-col md:flex-row pb-6">
      <div className="w-full md:w-1/2 text-zinc-400 px-6 border-r-[1px] border-r-zinc-800 flex items-center">
        <div className="py-6">
          <h2 className="font-semibold mb-1">Salut! Je suis Cabrel Ngamaleu</h2>
          <p className="text-base leading-6 ">
            Ingénieur logiciel justifiant de plus de 6 années d'expérience dans le développement d'applications web et mobiles.
             Maîtrisant des technologies phares telles que Java, Angular, Laravel, flutter , React et Next.Js , je mets à profit mon expertise technique 
             et ma créativité pour concevoir des solutions innovantes et conviviales. Doté d'excellentes aptitudes en communication et d'un esprit d'équipe affirmé.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-6">
        <ul className="flex flex-col gap-1">
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Age:</span>
            31 ans
          </li>
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Résidence:</span>
            Cameroun
          </li>
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Freelance:</span>
            Disponible
          </li>
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Adresse:</span>
            Yaoundé, Cameroon
          </li>
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Email:</span>
            ncabrel@yahoo.fr
          </li>
          <li className="aboutRightLi">
            <span className="aboutRightLiSpan">Téléphone:</span>
            +237 695669921
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutMe;
