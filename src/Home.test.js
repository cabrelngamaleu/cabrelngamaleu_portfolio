import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";

jest.mock("./components/home/Left", () => () => <header>Cabrel Ngamaleu</header>);
jest.mock("./components/home/sidenav/Sidenav", () => () => <nav>Menu secondaire</nav>);
jest.mock("./components/about/About", () => () => <section data-testid="about">Présentation</section>);
jest.mock("./components/resume/Resume", () => () => <section data-testid="resume">Parcours</section>);
jest.mock("./components/projects/Projects", () => () => <section data-testid="projects">Réalisations</section>);
jest.mock("./components/blog/Blog", () => () => <section data-testid="blog">Articles</section>);
jest.mock("./components/contact/Contact", () => () => <section data-testid="contact">Écrire</section>);

afterEach(cleanup);

describe("Navigation historique — tests de caractérisation", () => {
  test("affiche le profil et la présentation par défaut", () => {
    render(<Home />);
    expect(screen.getByText("Cabrel Ngamaleu")).toBeInTheDocument();
    expect(screen.getAllByTestId("about")).toHaveLength(2);
    expect(screen.getAllByTestId("projects")).toHaveLength(1);
  });

  test("ouvre les projets puis le contact sans perdre le profil", () => {
    render(<Home />);
    fireEvent.click(screen.getByText("Projets"));
    expect(screen.getAllByTestId("projects")).toHaveLength(2);
    expect(screen.getAllByTestId("about")).toHaveLength(1);
    fireEvent.click(screen.getByText("Contact"));
    expect(screen.getAllByTestId("contact")).toHaveLength(2);
    expect(screen.getAllByTestId("projects")).toHaveLength(1);
    expect(screen.getByText("Cabrel Ngamaleu")).toBeInTheDocument();
  });
});
