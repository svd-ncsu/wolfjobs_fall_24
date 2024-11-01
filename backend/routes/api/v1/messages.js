const express = require("express");
const router = express.Router();
const messagesController = require("../../../controllers/api/v1/messages_controller");

// Get all messages
router.get("/messages", messagesController.getAllMessages);

// Send a new message
router.post("/messages", messagesController.sendMessage);

module.exports = router;
