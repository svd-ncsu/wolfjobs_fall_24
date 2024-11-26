import { render, screen } from "@testing-library/react";
 
import JobQuestionnaire from "../../../src/Pages/CreateJob/jobQuestionnaire";
import { MemoryRouter } from "react-router";

describe("JobQuestionnaire", () => {
  it("renders JobQuestionnaire component without crashing", () => {
    render(
      <MemoryRouter>
        <JobQuestionnaire />
      </MemoryRouter>
    );
    expect(screen.getByText("Create New Job Listing")).toBeInTheDocument();
  });

  it("contains a Proceed button", () => {
    render(
      <MemoryRouter>
        <JobQuestionnaire />
      </MemoryRouter>
    );
    expect(screen.getByRole("button", { name: /Proceed/i })).toBeInTheDocument();
  });

  it("contains question input fields", () => {
    render(
      <MemoryRouter>
        <JobQuestionnaire />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/Question 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Question 2/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Question 3/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Question 4/i)).toBeInTheDocument();
  });
});


