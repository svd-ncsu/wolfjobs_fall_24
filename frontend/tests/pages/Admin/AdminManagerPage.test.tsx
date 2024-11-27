import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminManagerPage from "../../../src/Pages/Admin/AdminManagerPage";
import { MemoryRouter } from "react-router";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { vitest } from "vitest";

vitest.mock("axios");
const mockedAxios = axios as vitest.Mocked<typeof axios>;

describe("AdminManagerPage", () => {
  const mockManagers = [
    {
      _id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      affiliation: "Company A",
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456",
      affiliation: "Company B",
    },
  ];

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: { success: true, data: { managers: mockManagers } },
    });
    mockedAxios.post.mockResolvedValue({ data: { success: true } });
  });

  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("renders the Managers page title", async () => {
    render(
      <MemoryRouter>
        <AdminManagerPage />
      </MemoryRouter>
    );

    const title = await screen.findByRole("heading", { name: /Managers/i });
    expect(title).toBeInTheDocument();
  });

  it("fetches and displays managers", async () => {
    render(
      <MemoryRouter>
        <AdminManagerPage />
      </MemoryRouter>
    );

    const rows = await screen.findAllByRole("row");
    expect(rows).toHaveLength(mockManagers.length + 1); // Header row + manager rows
  });

  it("deletes a manager on delete button click", async () => {
    render(
      <MemoryRouter>
        <AdminManagerPage />
        <ToastContainer />
      </MemoryRouter>
    );

    const deleteButtons = await screen.findAllByRole("button", { name: /Delete/i });
    expect(deleteButtons).toHaveLength(mockManagers.length);

    fireEvent.click(deleteButtons[0]);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:8000/api/v1/users/deletemanager",
      { managerId: mockManagers[0]._id }
    );

    await waitFor(() => {
      expect(screen.queryByText(mockManagers[0].name)).toBeNull();
    });
  });

  it("toggles dark mode", async () => {
    render(
      <MemoryRouter>
        <AdminManagerPage />
      </MemoryRouter>
    );

    const toggleButton = await screen.getByRole("button", { name: /☀️/i });
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);

    const darkModeToggle = await screen.findByRole("button", { name: /🌙/i });
    expect(darkModeToggle).toBeInTheDocument();
  });

  it("displays an error message if managers fail to load", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { success: false, message: "Failed to fetch managers" },
    });

    render(
      <MemoryRouter>
        <AdminManagerPage />
      </MemoryRouter>
    );

    const errorMessage = await screen.findByText(/Failed to fetch managers/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
