const Message = require('../models/message');
const User = require('../models/user');

// Send a message
module.exports.sendMessage = async function (req, res) {
    try {
      const { content } = req.body;
  
      // Ensure `req.user` is populated
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'Unauthorized: Sender information missing' });
      }
  
      const senderId = req.user._id;
  
      // Create and save the new message
      const message = new Message({
        sender: senderId,
        receiver: 'all', // Receiver is 'all' for broadcast
        content,
      });
  
      await message.save();
      return res.status(200).json({ message: 'Message sent and broadcasted' });
    } catch (err) {
      console.log('Error in sending message:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

// Get messages between two users
module.exports.getMessages = async function (req, res) {
    try {
      const userId = req.user._id; // Current user ID
      const userEmail = req.user.email; // Current user's email
  
      const messages = await Message.find({
        $or: [
          { sender: userId }, // Messages sent by the user
          { receiver: 'all' }, // Broadcast messages
          { receiver: userEmail }, // Direct messages sent to the user
        ],
      }).sort({ timestamp: 1 });
  
      console.log('Fetched messages:', messages);
      return res.status(200).json({ messages });
    } catch (err) {
      console.log('Error in fetching messages:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

// Mark a message as read (optional)
module.exports.markAsRead = async function (req, res) {
  try {
    const { messageId } = req.body;
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Update the message status to 'read'
    message.status = 'read';
    await message.save();

    return res.status(200).json({ message: 'Message marked as read' });
  } catch (err) {
    console.log('Error in marking message as read:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
