import { render, screen } from "@testing-library/react";
 
import Resume from "../../../src/Pages/Resume/Resume";
import { expect } from 'chai';

describe("Resume", () => {
  beforeEach(() => {
    render(<Resume />);
  });

  test("renders the submit resume button", () => {
    const submitButton = screen.getByRole("button", { name: /submit resume/i });
    expect(submitButton).to.exist;
  });

  test("renders the resume upload instructions", () => {
    const instructions = screen.getByText(/Please upload your resume below to get started on your journey with us!/i);
    expect(instructions).to.exist;
  });

  test("has the correct background image", () => {
    const backgroundDiv = screen.getByTestId("resume-background");
    const style = window.getComputedStyle(backgroundDiv);
    expect(style.backgroundImage).to.include("/images/profile.svg");
  });
});