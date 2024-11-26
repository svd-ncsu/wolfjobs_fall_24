const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message_controller');
const passport = require('passport');  // Assuming you are using Passport for authentication

// Route to send a message
router.post('/send', passport.authenticate('local', { session: true }), messageController.sendMessage);

// Route to fetch messages between two users
router.get('/chat', passport.authenticate('local', { session: true }), messageController.getMessages);

// Route to mark a message as read
router.post('/mark-read', passport.authenticate('local', { session: true }), messageController.markAsRead);

module.exports = router;
