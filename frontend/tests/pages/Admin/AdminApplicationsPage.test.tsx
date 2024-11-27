import { render, screen, fireEvent } from "@testing-library/react";
import AdminApplicationsPage from "../../../src/Pages/Admin/AdminApplicationsPage";
import { MemoryRouter } from "react-router";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { vitest } from "vitest";

vitest.mock("axios");
const mockedAxios = axios as vitest.Mocked<typeof axios>;

describe("AdminApplicationsPage", () => {
  const mockApplications = [
    {
      _id: "1",
      applicantid: "101",
      applicantname: "John Doe",
      applicantemail: "john.doe@example.com",
      jobname: "Software Engineer",
      jobid: "2001",
      managerid: "5001",
      status: "Pending",
    },
    {
      _id: "2",
      applicantid: "102",
      applicantname: "Jane Smith",
      applicantemail: "jane.smith@example.com",
      jobname: "Data Scientist",
      jobid: "2002",
      managerid: "5002",
      status: "Approved",
    },
  ];

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: { success: true, application: mockApplications },
    });
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("renders the Applications page title", async () => {
    render(
      <MemoryRouter>
        <AdminApplicationsPage />
      </MemoryRouter>
    );

    const title = await screen.findByRole("heading", { name: /Applications/i });
    expect(title).toBeInTheDocument();
  });

  it("fetches and displays applications", async () => {
    render(
      <MemoryRouter>
        <AdminApplicationsPage />
      </MemoryRouter>
    );

    const rows = await screen.findAllByRole("row");
    expect(rows).toHaveLength(mockApplications.length + 1); // Header row + application rows
  });

  it("deletes an application on delete button click", async () => {
    mockedAxios.post.mockResolvedValue({ data: { success: true } });

    render(
      <MemoryRouter>
        <AdminApplicationsPage />
        <ToastContainer />
      </MemoryRouter>
    );

    const deleteButtons = await screen.findAllByRole("button", { name: /delete/i });
    expect(deleteButtons).toHaveLength(mockApplications.length);

    fireEvent.click(deleteButtons[0]);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:8000/api/v1/users/deleteapplication",
      { applicationId: mockApplications[0]._id }
    );

    expect(await screen.findAllByRole("row")).toHaveLength(mockApplications.length + 1); // One row less after deletion
  });

  it("toggles dark mode", async () => {
    render(
      <MemoryRouter>
        <AdminApplicationsPage />
      </MemoryRouter>
    );

    const toggleButtons = await screen.getAllByRole("button", { name: /☀️/i });
    expect(toggleButtons[0]).toBeInTheDocument();

    fireEvent.click(toggleButtons[0]);

    const darkModeToggle = await screen.findByRole("button", { name: /🌙/i });
    expect(darkModeToggle).toBeInTheDocument();
  });
});
