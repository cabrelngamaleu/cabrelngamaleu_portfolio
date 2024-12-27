import React from "react";
import Title from "../home/Title";
import { blogImgOne, blogImgTwo, blogImgThree } from "../../assets";
import BlogCard from "./BlogCard";

const Blog = () => {
  return (
    <div>
      <Title title="Derniers" subTitle="Posts" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lgl:gap-10">
        <div className="px-6">
          <BlogCard
            image={blogImgOne}
            title="16 Septembre, 2020"
            subTitle="Conference UI & UX à Lviv 2022"
            category="UI & UX"
          />
          <BlogCard
            image={blogImgTwo}
            title="15 Juillet, 2020"
            subTitle="Comment dévenir un Designer créatif"
            category="Documentation"
          />
          <BlogCard
            image={blogImgThree}
            title="14 Juillet, 2020"
            subTitle="Réflexions des designers sur les modèles d'interface utilisateur mobile"
            category="Application Mobile"
          />
          <BlogCard
            image={blogImgOne}
            title="13 Juillet, 2020"
            subTitle="Conférence Designer à Floride, USA 2020"
            category="Documentation"
          />
        </div>
        <div className="px-6">
          <BlogCard
            image={blogImgThree}
            title="13 Juillet, 2020"
            subTitle="Conférence Designer à Floride, USA 2021"
            category="Documentation"
          />
          <BlogCard
            image={blogImgTwo}
            title="8 Août , 2024"
            subTitle="Documentation sur Next.js 2024"
            category="Developpement Web"
          />
          <BlogCard
            image={blogImgOne}
            title="9 Septembre, 2024"
            subTitle="Comprendre Spring Boot "
            category="Sécurité Java"
          />
          <BlogCard
            image={blogImgThree}
            title="09 Novembre, 2024"
            subTitle="Comment dévenir expert en Cybersecurité"
            category="Réseau Informatique"
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
