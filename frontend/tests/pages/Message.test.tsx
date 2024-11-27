import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChatApp from "../../src/Pages/Message";
import { io, Socket } from "socket.io-client";
import { vitest } from "vitest";

// Mock socket.io-client
vitest.mock("socket.io-client");

const mockedSocket = io as vitest.MockedFunction<typeof io>;

describe("ChatApp", () => {
  let socketMock: vitest.Mocked<Socket>;

  beforeEach(() => {
    // Simulate login by setting a token in localStorage
    localStorage.setItem("token", "fake-jwt-token");

    // Create a mocked socket instance with necessary methods
    socketMock = {
      on: vitest.fn(),
      emit: vitest.fn(),
      connected: true,
      disconnect: vitest.fn(),
    };

    // Mock the return value of io to return the socketMock instance
    mockedSocket.mockReturnValue(socketMock);
  });

  afterEach(() => {
    vitest.clearAllMocks();
    localStorage.removeItem("token"); // Remove token after each test
  });

  it("renders the Chat Room title", async () => {
    render(<ChatApp />);

    const title = await screen.findByRole("heading", { name: /Chat Room/i });
    expect(title).toBeInTheDocument();
  });

  it("sends a message when the send button is clicked", async () => {
    render(<ChatApp />);

    const inputField = await screen.getByPlaceholderText("Type a message...");
    fireEvent.change(inputField, { target: { value: "Hello, World!" } });

    const sendButton = await screen.getByRole("button", { name: /Send/i });
    fireEvent.click(sendButton);

    // Ensure emit is called correctly
    await waitFor(() => {
      expect(socketMock.emit).toHaveBeenCalledWith("sendMessage", {
        content: "Hello, World!",
      });
    });
  });

  it("toggles dark mode", async () => {
    render(<ChatApp />);

    const toggleButton = await screen.getByRole("button", { name: /☀️/i });
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton); // Change to dark mode

    const darkModeToggle = await screen.findByRole("button", { name: /🌙/i });
    expect(darkModeToggle).toBeInTheDocument();
  });

  it("displays an error if the token is not found", async () => {
    localStorage.removeItem("token"); // Simulate absence of token

    const spy = vitest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console error in test
    render(<ChatApp />);

    expect(spy).toHaveBeenCalledWith("Token not found! User needs to log in.");
  });
});
