import { render, screen } from "@testing-library/react";
import React from "react";
import NavBarItem from "../../../src/components/Header/NavBarItem";
import { MemoryRouter } from "react-router-dom";

describe("NavBarItem", () => {
  it("renders NavBarItem", () => {
    render(
      <MemoryRouter>
        <NavBarItem link={"/"} text="Home" />
      </MemoryRouter>
    );
    const headline = screen.getByText(/Home/i);
    expect(headline).toBeInTheDocument();
  });

  it("renders the correct text", () => {
    render(
      <MemoryRouter>
        <NavBarItem link="/test" text="Test Link" />
      </MemoryRouter>
    );

    // Check if the text is rendered correctly
    const linkElement = screen.getByText("Test Link");
    expect(linkElement).toBeInTheDocument();
  });
});
