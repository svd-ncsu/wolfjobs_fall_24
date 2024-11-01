import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Profile from "../../../src/Pages/Profile/Profile";

// // Mocking useUserStore to provide a minimal test implementation
// jest.mock("../../../src/store/UserStore", () => ({
//   useUserStore: jest.fn(() => ({
//     name: "Test User",
//     email: "testuser@example.com",
//     address: "123 Test St",
//     role: "Developer",
//     skills: [], // Simulating an empty skills array
//     phonenumber: "123-456-7890",
//     affiliation: "Test University",
//     availability: "Available",
//     gender: "Non-binary",
//     hours: "Full-time",
//     resume: "resume.pdf",
//   })),
// }));

describe("Profile", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
  });

  it("renders the Profile component successfully", () => {
    const title = screen.getByText(/Profile/i);
    expect(title).toBeInTheDocument();
  });

  it("validates the presence of the user name field", () => {
    const nameField = screen.getByText(/Name/i);
    expect(nameField).toBeInTheDocument();
  });

  it("confirms the user email field is correctly displayed", () => {
    const emailField = screen.getByText(/Email/i);
    expect(emailField).toBeInTheDocument();
  });

  it("ensures the user role field is visible", () => {
    const roleField = screen.getByText(/Role/i);
    expect(roleField).toBeInTheDocument();
  });

  it("checks the visibility of the user address field", () => {
    const addressField = screen.getByText(/Address/i);
    expect(addressField).toBeInTheDocument();
  });

  it("validates that the user phone number field is present", () => {
    const phoneField = screen.getByText(/Phone Number/i);
    expect(phoneField).toBeInTheDocument();
  });

  it("ensures the skills section is rendered for the user", () => {
    const skillsFields = screen.getAllByText(/Skills/i);
    expect(skillsFields.length).toBeGreaterThan(0); // Check that at least one element with "Skills" exists
  });

  it("confirms the user affiliation field is displayed properly", () => {
    const affiliationField = screen.getByText(/Affiliation/i);
    expect(affiliationField).toBeInTheDocument();
  });

  it("verifies that the user availability field is present", () => {
    const availabilityField = screen.getByText(/Availability/i);
    expect(availabilityField).toBeInTheDocument();
  });

  it("checks for the presence of the user gender field", () => {
    const genderField = screen.getByText(/Gender/i);
    expect(genderField).toBeInTheDocument();
  });

  it("validates the display of the user resume field", () => {
    const resumeField = screen.getByText(/Resume/i);
    expect(resumeField).toBeInTheDocument();
  });

  it("displays 'No skills available' if skills are empty", () => {
    // Expect to find a specific message when skills are empty
    const noSkillsMessage = screen.getByText(/No skills available/i);
    expect(noSkillsMessage).toBeInTheDocument();
  });
});


