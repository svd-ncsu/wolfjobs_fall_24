import { render, screen } from "@testing-library/react";
 
import LandingPage from "../../../src/Pages/Auth/landingPage";
import { MemoryRouter } from "react-router";

describe("LandingPage", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
  });

  it("renders the Sign Up button", () => {
    const signUpButton = screen.getByRole("button", { name: /sign up/i });
    expect(signUpButton).toBeInTheDocument();
  });

  it("renders the Login button", () => {
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

});
