import { render } from "@testing-library/react";
 
import JobListView from "../../../src/components/Job/JobListView";
import { MemoryRouter } from "react-router-dom";

describe("JobListView", () => {
  it("renders JobListView", () => {
    render(
      <MemoryRouter>
        <JobListView JobList={{ _id: 1 }} title="All jobs" />
      </MemoryRouter>
    );
  });
});
