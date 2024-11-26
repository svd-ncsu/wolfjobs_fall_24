const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const jwt = require("jsonwebtoken"); // Ensure you have this package installed
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const db = require("./config/mongoose");
const Message = require("./models/message"); // Adjust the path to where your Message model is located
const User = require('./models/user'); // Ensure the path matches your project structure


const app = express();
const port = 8000; // Single port for both Express and Socket.io
const server = http.createServer(app); // Use the same server for Express and Socket.io
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

// Middleware configuration
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("./assets"));
app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Session configuration
app.use(
  session({
    name: "wolfjobs",
    secret: "blahsomething", // Change this secret in production
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

// Passport.js initialization
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Routes
app.use("/messages", require("./routes/messages"));
app.use("/", require("./routes"));

// Socket.io configuration
const users = {}; // Map to store connected users with their socket ID

io.on('connection', (socket) => {
  console.log("A user connected");

  // Handle JWT authentication during socket connection
  socket.on("join", (data) => {
    const { token } = data;

    jwt.verify(token, "wolfjobs", (err, decoded) => {
      if (err) {
        console.log("Invalid token", err);
        return socket.disconnect(); // Disconnect if token is invalid
      }
      console.log(data);
      socket.userId = decoded._id;
      console.log(decoded);
      users[socket.userId] = socket.id; // Store socket ID by user ID
      console.log("User connected:", decoded.email);

      // Emit welcome message to the user after a successful connection
      socket.emit("receiveMessage", { sender: "System", text: `Welcome ${decoded.email}!` });
    });
  });
  
  // Listen for messages from clients
  socket.on("sendMessage", async (messageData) => {
    try {
      const { content } = messageData; // Only content is required for broadcasting
      const senderId = socket.userId; // Get the sender's ID from the socket
  
      if (!senderId) {
        console.error("Sender ID is missing. Cannot send message.");
        return;
      }
  
      // Fetch the sender's email using their userId
      const sender = await User.findById(senderId);
      if (!sender || !sender.email) {
        console.error("Sender not found in the database.");
        return;
      }
  
      const senderEmail = sender.email;
  
      // Save the message to the database
      const message = new Message({
        sender: senderId,
        receiver: 'all', // Broadcast message
        content,
      });
      await message.save();
  
      // Broadcast the message to all connected clients
      io.emit("receiveMessage", {
        sender: senderEmail, // Use sender's email for display
        text: content,
      });
    } catch (err) {
      console.error("Error saving or broadcasting message:", err);
    }
  });
  


  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
    delete users[socket.userId]; // Remove the user from the map when they disconnect
  });
});


// Start the server
server.listen(port, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
    return;
  }
  console.log(`Server is running on port ${port}`);
});
