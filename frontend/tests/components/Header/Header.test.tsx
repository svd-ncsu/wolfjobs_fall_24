import { render, screen } from "@testing-library/react";
 
import Header from "../../../src/components/Header/Header";
import { MemoryRouter } from "react-router";

describe("Header", () => {
  it("renders Header", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    // const headline = screen.getByText(/Hello/i);
    // expect(headline).toBeInTheDocument();
  });

  it("renders logo with correct src", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Check if the logo is present in the document
    const logo = screen.getByAltText("logo") as HTMLImageElement; // Cast to HTMLImageElement
    expect(logo).toBeInTheDocument();

    // Check if the logo has the correct src attribute
    expect(logo.src).toContain("/images/wolfjobs-logo.png"); // Check if the src contains the correct path
  });
});
