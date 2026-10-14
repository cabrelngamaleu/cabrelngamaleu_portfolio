import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SectionTitle from "../SectionTitle";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe("SectionTitle", () => {
  it("renders title correctly", () => {
    render(<SectionTitle title="My Title" />);
    expect(screen.getByText("My Title")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<SectionTitle title="My Title" subtitle="My Subtitle" />);
    expect(screen.getByText("My Subtitle")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    render(<SectionTitle title="My Title" />);
    expect(screen.queryByText("My Subtitle")).not.toBeInTheDocument();
  });
});
