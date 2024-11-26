import { render, screen, fireEvent } from "@testing-library/react";
 
import RegistrationPage from "../../../src/Pages/Auth/RegistrationPage";
import { MemoryRouter } from "react-router";

describe("RegistrationPage", () => {
  it("renders RegistrationPage", () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );
    // const headline = screen.getByText(/Hello/i);
    // expect(headline).toBeInTheDocument();
  });

  it('checks if "Admin" role option exists', () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    // Open the Role dropdown
    fireEvent.mouseDown(screen.getByLabelText(/Role/i));

    // Check if "Admin" option is in the document
    const adminOption = screen.getByText("Admin");
    expect(adminOption).toBeInTheDocument();
  });

  it('checks if "Manager" role option exists', () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    // Open the Role dropdown
    fireEvent.mouseDown(screen.getByLabelText(/Role/i));

    // Check if "Manager" option is in the document
    const managerOption = screen.getByText("Manager");
    expect(managerOption).toBeInTheDocument();
  });

  it('checks if "Applicant" role option exists', () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    // Open the Role dropdown
    fireEvent.mouseDown(screen.getByLabelText(/Role/i));

    // Check if "Applicant" option is in the document
    const applicantOption = screen.getByRole("option", { name: "Applicant" });
    expect(applicantOption).toBeInTheDocument();
  });
});


