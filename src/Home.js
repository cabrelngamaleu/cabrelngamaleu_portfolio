import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile, navigation, domains, projects, experience, education } from "./portfolioData";

function SectionHeading({ number, eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{number} / {eyebrow}</p>
      <div className="section-heading-row"><h2>{title}</h2>{children}</div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className={`project-card tone-${project.tone}`}>
      <div className="project-art" aria-hidden="true">
        <span className="art-label">{project.visual}</span>
        <div className="art-grid"><span /><span /><span /><span /><span /><span /></div>
        <span className="art-number">{project.number}</span>
        <span className="art-caption">CABREL NGAMALEU / ÉTUDE DE CAS</span>
      </div>
      <div className="project-body">
        <p className="eyebrow">{project.company} · {project.period}</p>
        <h3>{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <ul className="tag-list" aria-label="Technologies du projet">
          {project.stack.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <details className="case-study">
          <summary>Explorer le projet <span aria-hidden="true">+</span></summary>
          <div className="case-content">
            <dl>
              <dt>Le contexte</dt><dd>{project.context}</dd>
              <dt>Mon rôle</dt><dd>{project.role}</dd>
              <dt>La solution</dt><dd>{project.solution}</dd>
              <dt>Le résultat documenté</dt><dd>{project.result}</dd>
            </dl>
            <p className="source-note">Présentation issue de mon CV. Les schémas sont des compositions éditoriales, pas des captures des outils internes.</p>
          </div>
        </details>
      </div>
    </article>
  );
}

export default function Home() {
  const [filter, setFilter] = useState("Tous");
  const [activeDomain, setActiveDomain] = useState(domains[0].id);
  const reducedMotion = useReducedMotion();
  const selectedDomain = domains.find((domain) => domain.id === activeDomain) || domains[0];
  const visibleProjects = filter === "Tous" ? projects : projects.filter((project) => project.category === filter);
  const categories = ["Tous", ...Array.from(new Set(projects.map((project) => project.category)))];

  return (
    <div className="portfolio">
      <a className="skip-link" href="#main-content">Aller au contenu</a>
      <header className="site-header">
        <a href="#about" className="wordmark" aria-label="Cabrel Ngamaleu — accueil">cabrel<span>.</span></a>
        <nav className="desktop-navigation" aria-label="Navigation principale">
          {navigation.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
        </nav>
        <a className="header-contact" href={`mailto:${profile.email}`}>Parlons de votre projet <span aria-hidden="true">↗</span></a>
        <details className="mobile-navigation">
          <summary>Menu <span aria-hidden="true">+</span></summary>
          <nav aria-label="Navigation mobile">
            {navigation.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
          </nav>
        </details>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section id="about" className="hero" aria-labelledby="hero-title">
          <div className="hero-meta"><p className="eyebrow">Ingénierie logicielle / Stratégie SI</p><p className="eyebrow">{profile.location}</p></div>
          <motion.div initial={false} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.4 }}>
            <h1 id="hero-title">Du code.<br />De la vision.<br /><em>De l’impact.</em></h1>
          </motion.div>
          <div className="hero-bottom">
            <div className="hero-signature"><span className="signature-line" aria-hidden="true" /><p><strong>{profile.name}</strong><span>{profile.role}</span></p></div>
            <div className="hero-introduction"><p>{profile.introduction}</p><a className="text-link" href="#projects">Découvrir mes réalisations <span aria-hidden="true">↘</span></a></div>
          </div>
          <div className="hero-stamp" aria-hidden="true"><span>CONCEVOIR</span><span>CONNECTER</span><span>FAIRE AVANCER</span><b>CN /</b></div>
        </section>

        <div className="manifesto-strip" aria-label="Ma démarche"><span>Le terrain avant la tendance.</span><span>La technique au service de l’usage.</span><span>De l’idée à l’exploitation.</span></div>

        <section id="projects" className="section projects-section" aria-labelledby="projects-title">
          <div id="projects-title"><SectionHeading number="01" eyebrow="Réalisations choisies" title="Moins de promesses. Plus de concret."><p>Des applications métier aux infrastructures : les problèmes que j’aide à résoudre.</p></SectionHeading></div>
          <div className="project-toolbar">
            <div className="project-filters" role="group" aria-label="Filtrer les réalisations">
              {categories.map((category) => <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}
            </div>
            <p className="result-count" role="status" aria-live="polite">{visibleProjects.length} réalisation{visibleProjects.length > 1 ? "s" : ""}</p>
          </div>
          <div className="project-grid">{visibleProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
        </section>

        <section id="expertise" className="section expertise-section" aria-labelledby="expertise-title">
          <div id="expertise-title"><SectionHeading number="02" eyebrow="Expertise" title="Trois regards. Une même exigence." /></div>
          <div className="expertise-layout">
            <div className="domain-selector" role="group" aria-label="Explorer une expertise">
              {domains.map((domain) => <button key={domain.id} type="button" aria-pressed={activeDomain === domain.id} aria-controls="expertise-panel" onClick={() => setActiveDomain(domain.id)}><span className="domain-number">{domain.number}</span><span>{domain.short}</span><span className="domain-arrow" aria-hidden="true">↗</span></button>)}
            </div>
            <div id="expertise-panel" className="expertise-panel" aria-live="polite" aria-atomic="true">
              <p className="eyebrow">{selectedDomain.label}</p><h3>{selectedDomain.description}</h3>
              <ul className="tag-list">{selectedDomain.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
              <p className="expertise-proof"><span>Sur le terrain</span>{selectedDomain.proof}</p>
              <a href="#projects" className="text-link" onClick={() => setFilter(selectedDomain.label)}>Voir les projets associés <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section id="resume" className="section resume-section" aria-labelledby="resume-title">
          <div id="resume-title"><SectionHeading number="03" eyebrow="Parcours" title="Construire. Apprendre. Prendre de la hauteur."><p>Un parcours entre développement, infrastructures et responsabilités de pilotage.</p></SectionHeading></div>
          <div className="timeline">
            {experience.map((job, index) => <details className="timeline-item" key={`${job.company}-${job.period}`} open={index === 0 ? true : undefined}>
              <summary><span className="timeline-period">{job.period}</span><span className="timeline-heading"><strong>{job.role}</strong><span>{job.company} · {job.location}</span></span><span className="timeline-toggle" aria-hidden="true">+</span></summary>
              <p className="timeline-description">{job.description}</p>
            </details>)}
          </div>
          <div className="education"><p className="eyebrow">Formation / {education.school}</p><h3>{education.title}</h3><p>{education.description}</p><a href={profile.cvUrl} target="_blank" rel="noopener noreferrer" className="text-link">Consulter mon CV complet (PDF) <span aria-hidden="true">↗</span></a></div>
        </section>

        <section id="contact" className="section contact-section" aria-labelledby="contact-title">
          <p className="eyebrow">04 / La suite s’écrit ensemble</p>
          <h2 id="contact-title">Un problème concret ?<br /><em>Parlons solution.</em></h2>
          <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<span aria-hidden="true">↗</span></a>
          <div className="contact-bottom"><p>Applications métier, systèmes d’information ou transformation digitale : commençons par votre contexte.</p><div><a href={profile.phoneHref}>{profile.phone}</a><span>{profile.location}</span></div></div>
        </section>
      </main>
      <footer className="site-footer"><p>{profile.name} · Ingénierie & stratégie SI</p><nav aria-label="Liens professionnels"><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="#about">Retour en haut ↑</a></nav><p className="footer-note">Conçu pour être utile. Pas pour ressembler à tout le monde.</p></footer>
    </div>
  );
}
