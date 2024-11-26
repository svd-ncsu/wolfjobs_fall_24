import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [token, setToken] = useState<string>(''); // Track the JWT token
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // State for dark mode
  const socketRef = useRef<Socket | null>(null); // Use useRef to store socket instance

  useEffect(() => {
    // Fetch the token after the user logs in
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); // Set the token once user is logged in
    } else {
      console.error("Token not found! User needs to log in.");
      // Handle redirection to login
    }
  }, []);

  // Initialize socket connection only after obtaining a valid token
  useEffect(() => {
    if (token) {
      socketRef.current = io('http://localhost:8000'); // Connect to the WebSocket server
      socketRef.current.emit('join', { token }); // Emit token after user logs in

      // Listen for incoming messages
      socketRef.current.on('receiveMessage', (message: { sender: string; text: string }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          `${message.sender}: ${message.text}`,
        ]);
      });

      return () => {
        socketRef.current?.disconnect();
      };
    }
  }, [token]); // Reconnect only when the token is available

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      const message = { content: input };

      // Check if the socket is connected before emitting the message
      if (socketRef.current?.connected) {
        console.log('Sending message:', message);
        socketRef.current.emit('sendMessage', message); // Emit message to server
        setInput(''); // Clear input field
      } else {
        console.log('Socket not connected, waiting for connection...');
      }
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle dark mode state
  };

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? '#121212' : '#F9F9F9',
        color: isDarkMode ? '#FFFFFF' : '#000000',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <button
        onClick={toggleDarkMode}
        style={{
          position: 'absolute',
          top: '80px',
          right: '20px',
          padding: '10px 15px',
          borderRadius: '5px',
          backgroundColor: isDarkMode ? "#1E90FF" : "#FFFFA0", // Gold for light mode, blue for dark mode
          color: isDarkMode ? "#333" : "#fff",
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {isDarkMode ? '🌙' : '☀️'}
      </button>

      <div className="flex justify-center items-center h-full">
        <div
          className="w-full max-w-md shadow-lg rounded-lg"
          style={{
            backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF',
          }}
        >
          <div className="p-4 border-b">
            <div>
              <div className="flex justify-between">
                <h2
                  className="text-2xl font-bold"
                  style={{
                    color: isDarkMode ? '#FFFFFF' : '#000000',
                  }}
                >
                  Chat Room
                </h2>
              </div>
            </div>
          </div>

          {/* Chat Box */}
          <div
            id="chat-box"
            className="h-80 overflow-y-auto p-4 space-y-4"
            style={{
              backgroundColor: isDarkMode ? '#333333' : '#F9F9F9',
              color: isDarkMode ? '#FFFFFF' : '#000000',
            }}
          >
            {messages.map((message, index) => (
              <div key={index} className="flex justify-start space-x-2">
                <div
                  className="p-2 rounded-lg max-w-xs break-words"
                  style={{
                    backgroundColor: isDarkMode ? '#444444' : '#E0E0E0',
                    color: isDarkMode ? '#FFFFFF' : '#000000',
                  }}
                >
                  {message}
                </div>
              </div>
            ))}
          </div>

          {/* Input for sending messages */}
          <div className="p-4 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: isDarkMode ? '#444444' : '#FFFFFF',
                color: isDarkMode ? '#FFFFFF' : '#000000',
              }}
            />
            <button
              onClick={handleSendMessage}
              className="w-full p-2 rounded-lg mt-2"
              style={{
                backgroundColor: isDarkMode ? '#6200EE' : '#1D72B8',
                color: '#FFFFFF',
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
