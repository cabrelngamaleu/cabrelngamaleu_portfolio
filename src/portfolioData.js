// Source éditoriale : CV_Ngamaleu_DSI.pdf fourni par Cabrel.
// Les résultats sont déclarés dans le CV, pas audités indépendamment.
// Ne pas transformer un chantier planifié en réalisation livrée.
export const profile = {
  name: "Cabrel Ngamaleu",
  fullName: "Ngamaleu Kakanou Cabrel",
  role: "Ingénieur Génie Logiciel & Chef de Service Informatique",
  location: "Yaoundé, Cameroun",
  email: "ncabrel@yahoo.fr",
  phone: "+237 695 66 99 21",
  phoneHref: "tel:+237695669921",
  github: "https://github.com/cabrelngamaleu",
  linkedin: "https://www.linkedin.com/in/cabrel-ngamaleu-kakanou-26b56a7a/",
  // Hébergement actuel du document fourni. À rapatrier sur un hébergement
  // maîtrisé avant mise en production pour éviter une dépendance aux uploads.
  cvUrl: "https://d3p662obnq9uz2.cloudfront.net/chat-uploads/chat/user/6ac0f1ff14e92d150be46fff/6ac0e504d42d3187406dc897/193229a5-CV_Ngamaleu_DSI.pdf",
  introduction: "Du développement d’applications métier au pilotage de systèmes d’information multi-sites, je relie les choix techniques aux besoins de l’entreprise.",
};

export const navigation = [
  { href: "#projects", label: "Réalisations" },
  { href: "#resume", label: "Parcours" },
  { href: "#expertise", label: "Expertise" },
  { href: "#contact", label: "Contact" },
];

export const domains = [
  { id: "applications", number: "01", label: "Applications", short: "Concevoir",
    description: "Des interfaces aux API, construire des outils qui répondent à un usage réel.",
    skills: ["React / Next.js", "Angular", "Laravel", "Spring Boot", "React Native / Flutter"],
    proof: "Gestion des tâches, SIRH et applications de gestion des stocks." },
  { id: "systems", number: "02", label: "Systèmes & sécurité", short: "Sécuriser",
    description: "Connecter les sites, superviser les services et préparer la continuité d’activité.",
    skills: ["Linux", "Docker", "VPN / Cisco ASA", "Zabbix / GLPI", "JWT / OAuth2 / MFA"],
    proof: "Supervision sous Debian, liaisons VPN et infrastructure de sauvegarde chez MAMA HOLDING." },
  { id: "strategy", number: "03", label: "Gouvernance & data", short: "Piloter",
    description: "Faire dialoguer stratégie SI, équipes, budgets et données pour éclairer les décisions.",
    skills: ["SAGE 100 Cloud", "SQL Server / SSIS", "Power BI", "Gestion budgétaire", "Management d’équipe"],
    proof: "Déploiement ERP multi-sites et pilotage d’une plateforme de centralisation des données SAGE." },
];

export const projects = [
  { id: "sage", number: "01", category: "Gouvernance & data", domain: "strategy", company: "MAMA HOLDING S.A", period: "Depuis 2025",
    title: "Un ERP. Des agences connectées.", subtitle: "Déploiement SAGE 100 Cloud multi-sites", visual: "ERP / MULTI-SITES", tone: "rust",
    context: "Relier les applications de gestion des agences à la direction générale dans un environnement multi-sites.",
    role: "Pilotage du déploiement et de la configuration de bout en bout, de l’intégration à l’adoption par les utilisateurs.",
    solution: "SAGE 100 Cloud : gestion commerciale, comptabilité, paie et RH, immobilisations, saisie de caisse et moyens de paiement. Connexion des agences par VPN sécurisé.",
    result: "Un déploiement ERP couvrant les agences et leur connexion à la direction générale. Le CV ne fournit pas de mesure chiffrée de gain.",
    stack: ["SAGE 100 Cloud", "VPN", "Pilotage applicatif"] },
  { id: "data", number: "02", category: "Gouvernance & data", domain: "strategy", company: "MAMA HOLDING S.A", period: "Depuis 2025",
    title: "De la donnée dispersée à une vision commune.", subtitle: "Plateforme propriétaire de centralisation SAGE", visual: "DATA / DÉCISION", tone: "ink",
    context: "Organiser la centralisation des données SAGE 100 et évaluer l’alternative entre une plateforme propriétaire et une solution SaaS.",
    role: "Pilotage de la conception et de l’évaluation de la solution, avec un périmètre de neuf modules et cinq phases.",
    solution: "Une architecture fondée sur SQL Server, SSIS et Power BI pour la centralisation et la restitution des données.",
    result: "La solution propriétaire a été retenue face à une offre SaaS concurrente. Le CV décrit la conception et la sélection, sans confirmer la livraison complète des cinq phases.",
    stack: ["SQL Server", "SSIS", "Power BI"] },
  { id: "tasks", number: "03", category: "Applications", domain: "applications", company: "Royal Grill Equipements", period: "2018 — 2024",
    title: "Le travail d’équipe, en temps réel.", subtitle: "Plateforme de gestion des tâches du personnel", visual: "APP / TEMPS RÉEL", tone: "sand",
    context: "Outiller la gestion des tâches du personnel avec une application métier et des échanges en temps réel.",
    role: "Développement d’applications et sécurisation de la plateforme dans le cadre du poste d’IT Manager.",
    solution: "Frontend Angular, TypeScript et RxJS ; backend Laravel et MySQL ; API REST, WebSocket avec Pusher, authentification JWT et conteneurisation Docker.",
    result: "Une plateforme de gestion des tâches intégrant le temps réel et des mesures de protection des accès aux API critiques.",
    stack: ["Angular", "Laravel", "WebSocket", "Docker"] },
  { id: "monitoring", number: "04", category: "Systèmes & sécurité", domain: "systems", company: "MAMA HOLDING S.A", period: "Depuis 2025",
    title: "Voir les incidents. Protéger la continuité.", subtitle: "Supervision et sécurisation des infrastructures", visual: "OPS / CONTINUITÉ", tone: "olive",
    context: "Améliorer la visibilité sur le parc informatique et sécuriser les infrastructures des différents sites.",
    role: "Mise en place de la supervision et redéfinition de l’architecture réseau sécurisée.",
    solution: "Zabbix sous Debian pour la supervision, firewall Cisco ASA pour la sécurité réseau et infrastructure cloud pour la sauvegarde du serveur en cas de sinistre.",
    result: "Le CV rapporte une meilleure visibilité et un meilleur temps de réponse aux incidents, sans indicateur chiffré publié.",
    stack: ["Zabbix", "Debian", "Cisco ASA", "Sauvegarde cloud"] },
];

export const experience = [
  { period: "Jan. 2025 — présent", company: "MAMA HOLDING S.A", location: "Yaoundé", role: "Chef de Service Informatique",
    description: "Stratégie SI, projets multi-sites, encadrement technique, budget et reporting à la direction. Déploiement ERP, supervision, sécurité et continuité d’activité." },
  { period: "Oct. 2018 — août 2024", company: "Royal Grill Equipements", location: "Douala", role: "IT Manager",
    description: "Direction d’une équipe de cinq développeurs. Pilotage des applications métier, de la stratégie digitale et du budget IT ; projets SIRH, stocks, IoT et architecture microservices." },
  { period: "Juil. — oct. 2018", company: "Sense SARL", location: "Yaoundé", role: "Ingénieur Informaticien",
    description: "Applications e-commerce et événementielles, intégration Power BI, administration systèmes et réseaux et sécurisation des applications web." },
  { period: "Avr. — août 2017", company: "CAMWATER — Direction Générale", location: "Douala", role: "Stagiaire Réseau Télécommunication",
    description: "Étude et mise en place de la supervision réseau, inventaire GLPI et documentation des procédures réseau dans le cadre du diplôme d’ingénieur." },
  { period: "Jan. — mars 2017", company: "Bloosat", location: "Yaoundé", role: "Développeur web / Réseau Informatique",
    description: "Site WordPress, application de gestion de stock des kits d’installation et déploiement d’ISPADMIN pour la gestion interne." },
];

export const education = {
  title: "Ingénieur en Génie Informatique",
  school: "UPAC · 2017",
  description: "Spécialité Génie Logiciel — major de promotion. Licence professionnelle en Génie Électrique et Communication à l’Université des Montagnes (2015).",
};
