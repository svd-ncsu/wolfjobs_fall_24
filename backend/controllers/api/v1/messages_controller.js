const Message = require("../../../models/message");

// Get all messages
module.exports.getAllMessages = async function (req, res) {
  try {
    const messages = await Message.find().sort("-createdAt");
    return res.json(200, {
      messages: messages.map(msg => msg.content),
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Send a new message
module.exports.sendMessage = async function (req, res) {
  try {
    const newMessage = new Message({
      content: req.body.message,
    });
    await newMessage.save();

    return res.status(200).json({
      message: "Message sent successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
