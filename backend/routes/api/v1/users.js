const express = require("express");
const router = express.Router();
const usersApi = require("../../../controllers/api/v1/users_api");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

router.post("/create-session", usersApi.createSession);
router.post("/signup", usersApi.signUp);
router.post("/edit", jsonParser, usersApi.editProfile);
router.get("/getprofile/:id", usersApi.getProfile);
router.get("/search/:name", usersApi.searchUser);
router.post("/createhistory", usersApi.createHistory);
router.get("/gethistory", usersApi.getHistory);
router.post("/createjob", jsonParser, usersApi.createJob);
router.get("/", usersApi.index);
router.get("/fetchapplications", usersApi.fetchApplication);
router.post("/acceptapplication", usersApi.acceptApplication);
router.post("/modifyApplication", jsonParser, usersApi.modifyApplication);
router.post("/generateOTP", usersApi.generateOtp);
router.post("/verifyOTP", usersApi.verifyOtp);
router.post("/rejectapplication", usersApi.rejectApplication);
router.post("/closejob", jsonParser, usersApi.closeJob);
router.post("/createapplication", jsonParser, usersApi.createApplication);

// Routes for getting all users and deleting a user
router.get("/users", usersApi.getAllUsers);
router.delete("/users/:id", usersApi.deleteUser);

const messagesController = require("../../../controllers/api/v1/messages_controller");

// Get all messages
router.get("/messages", messagesController.getAllMessages);

// Send a new message
router.post("/messages", messagesController.sendMessage);

module.exports = router;


// New route for password reset
router.post("/reset-password", jsonParser, usersApi.resetPassword);

module.exports = router;
