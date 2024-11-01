const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 8000;

const expressLayouts = require("express-ejs-layouts");

const db = require("./config/mongoose");

// Use CORS middleware to allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  methods: ['GET', 'POST'], // Specify allowed methods
  credentials: true, // Allow credentials (if needed)
}));

// Middleware
app.use(express.urlencoded({ extended: true })); // Recommended to set extended: true for nested objects
app.use(cookieParser());
app.use(express.static("./assets"));
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Session configuration
const session = require("express-session");
app.use(
  session({
    name: "wolfjobs",
    secret: "blahsomething", // Change this before deploying
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100, // Adjust as necessary
    },
  })
);
app.use(express.json()); // Add this line to parse JSON request bodies


// Passport configuration
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Route handlers
const messagesRoutes = require("./routes/api/v1/messages");
const userRoutes = require("./routes/api/v1/users");

app.use("/api/v1", messagesRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/", require("./routes"));

// Start server
app.listen(port, function (err) {
  if (err) {
    console.log("Error", err);
  }

  console.log("Server is running on", port);
});
