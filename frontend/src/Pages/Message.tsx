import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";

const Message = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/messages");
        setMessages(response.data.messages);
      } catch (error) {
        toast.error("Failed to load messages.");
      }
    };

    fetchMessages();
  }, []);

  // Function to handle sending a new message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage) {
      toast.error("Please enter a message.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/v1/messages",
        { message: newMessage },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setMessages([...messages, newMessage]); // Add the new message to the state
        setNewMessage(""); // Clear the input field
        toast.success("Message sent!");
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6">Messages</h2>
      
      <form onSubmit={handleSendMessage} className="flex mb-4">
        <TextField
          label="Write message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          variant="outlined"
          fullWidth
          required
          className="mr-2"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>

      <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
        <h3 className="text-lg font-semibold">All Messages</h3>
        <ul className="list-disc list-inside">
          {messages.map((msg, index) => (
            <li key={index} className="mb-2">
              {msg}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Message;
