import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../Navbar";

jest.mock("framer-motion", () => ({
  motion: {
    nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
    ul: ({ children, ...props }) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }) => <li {...props}>{children}</li>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock the scroll-spy hook
jest.mock("../../../hooks/useScrollSpy", () => ({
  useScrollSpy: () => "hero",
}));

describe("Navbar", () => {
  it("renders without crashing", () => {
    render(<Navbar />);
    expect(document.querySelector("nav")).toBeInTheDocument();
  });

  it("renders logo with correct name", () => {
    render(<Navbar />);
    expect(screen.getByText("Cabrel")).toBeInTheDocument();
    expect(screen.getByText(/Ngamaleu/i)).toBeInTheDocument();
  });

  it("renders nav links", () => {
    render(<Navbar />);
    expect(screen.getAllByText(/À propos/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Projets/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Contact/i)[0]).toBeInTheDocument();
  });
});
