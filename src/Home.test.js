import React from "react";
import { render, screen, within, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Home from "./Home";
import App from "./App";
import { profile, projects } from "./portfolioData";

// JSDOM has no matchMedia implementation. This deterministic browser seam
// requests reduced motion; visual animation behavior needs a browser review.
const originalMatchMedia = window.matchMedia;
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: query === "(prefers-reduced-motion)",
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});
afterEach(cleanup);
afterAll(() => {
  if (originalMatchMedia) {
    window.matchMedia = originalMatchMedia;
  } else {
    delete window.matchMedia;
  }
});

describe("Portfolio éditorial", () => {
  test("préserve le profil, les projets et les points de contact", () => {
    render(<Home />);
    expect(screen.getByText(profile.name, { selector: "strong" })).toBeInTheDocument();
    expect(screen.getByText(profile.role)).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
    expect(screen.getByRole("link", { name: /ncabrel@yahoo.fr/ })).toHaveAttribute("href", `mailto:${profile.email}`);
    expect(screen.getByRole("link", { name: profile.phone })).toHaveAttribute("href", profile.phoneHref);
  });

  test("utilise une navigation textuelle dont les ancres existent", () => {
    render(<Home />);
    const navigation = screen.getByRole("navigation", { name: "Navigation principale" });
    const links = within(navigation).getAllByRole("link");
    expect(links).toHaveLength(4);
    links.forEach((link) => {
      const target = link.getAttribute("href");
      expect(document.getElementById(target.slice(1))).toBeInTheDocument();
    });
    expect(screen.getByRole("link", { name: "Aller au contenu" })).toHaveAttribute("href", "#main-content");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  test("filtre les réalisations et permet de revenir à la liste complète", () => {
    render(<Home />);
    const filters = screen.getByRole("group", { name: "Filtrer les réalisations" });
    const applications = within(filters).getByRole("button", { name: "Applications" });
    userEvent.click(applications);
    expect(applications).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Le travail d’équipe, en temps réel." })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("1 réalisation");
    userEvent.click(within(filters).getByRole("button", { name: "Tous" }));
    expect(screen.getAllByRole("article")).toHaveLength(projects.length);
    expect(applications).toHaveAttribute("aria-pressed", "false");
  });

  test("permet d’activer un filtre au clavier", () => {
    render(<Home />);
    const filters = screen.getByRole("group", { name: "Filtrer les réalisations" });
    const security = within(filters).getByRole("button", { name: "Systèmes & sécurité" });
    security.focus();
    userEvent.keyboard("{Enter}");
    expect(security).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("status")).toHaveTextContent("1 réalisation");
  });

  test("relie une expertise aux études de cas correspondantes", () => {
    render(<Home />);
    const selector = screen.getByRole("group", { name: "Explorer une expertise" });
    const pilotage = within(selector).getByRole("button", { name: /Piloter/ });
    userEvent.click(pilotage);
    expect(pilotage).toHaveAttribute("aria-pressed", "true");
    const panel = document.getElementById("expertise-panel");
    expect(within(panel).getByText("Gouvernance & data")).toBeInTheDocument();
    userEvent.click(within(panel).getByRole("link", { name: /Voir les projets associés/ }));
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(screen.getByRole("status")).toHaveTextContent("2 réalisations");
  });

  test("structure chaque étude de cas avec un dépliant natif et sa provenance", () => {
    render(<Home />);
    screen.getAllByRole("article").forEach((article) => {
      const summary = within(article).getByText(/Explorer le projet/);
      expect(summary.tagName).toBe("SUMMARY");
      expect(summary.parentElement.tagName).toBe("DETAILS");
      expect(within(article).getByText("Mon rôle")).toBeInTheDocument();
      expect(within(article).getByText("Le résultat documenté")).toBeInTheDocument();
      expect(within(article).getByText(/Présentation issue de mon CV/)).toBeInTheDocument();
    });
  });

  test("actualise le poste actuel et ouvre le premier élément du parcours", () => {
    render(<Home />);
    const role = screen.getByText("Chef de Service Informatique", { selector: "strong" });
    expect(role.closest("details")).toHaveAttribute("open");
    expect(screen.getByText("Jan. 2025 — présent")).toBeInTheDocument();
    expect(screen.queryByText("31 ans")).not.toBeInTheDocument();
    expect(screen.queryByText("Infinity Logo")).not.toBeInTheDocument();
  });

  test("propose le CV fourni et protège les liens ouverts dans un nouvel onglet", () => {
    const { container } = render(<Home />);
    expect(screen.getByRole("link", { name: /Consulter mon CV complet/ })).toHaveAttribute("href", profile.cvUrl);
    container.querySelectorAll('a[target="_blank"]').forEach((link) => {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  test("met à jour le titre et la langue puis restaure le document au démontage", () => {
    const oldTitle = document.title;
    const oldLanguage = document.documentElement.getAttribute("lang");
    const { unmount } = render(<App />);
    expect(document.title).toBe("Cabrel Ngamaleu — Ingénierie logicielle & stratégie SI");
    expect(document.documentElement).toHaveAttribute("lang", "fr");
    unmount();
    expect(document.title).toBe(oldTitle);
    expect(document.documentElement.getAttribute("lang")).toBe(oldLanguage);
  });
});
