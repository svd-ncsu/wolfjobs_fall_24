import { render, screen } from "@testing-library/react";
 
import LoginPage from "../../../src/Pages/Auth/LoginPage";
import { MemoryRouter } from "react-router";

describe("LoginPage", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
  });

  it("renders the Login button", () => {
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  it("renders the container for the background image", () => {
    const backgroundContainer = screen.getByTestId("login-background");
    expect(backgroundContainer).toBeInTheDocument();
  });

  it("renders the 'Create a new account' option", () => {
    const createAccountLink = screen.getByText(/create a new account/i);
    expect(createAccountLink).toBeInTheDocument();
  });

  it("renders the sign-in form", () => {
    expect(screen.getByText(/sign in to your account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});
