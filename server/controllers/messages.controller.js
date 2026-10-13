const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');
const newMessageEmailTemplate = require('../templates/newMessageEmail');

/**
 * @desc    Create new contact message and send email notification
 * @route   POST /api/messages
 * @access  Public
 */
const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create message in database
    const newMessage = await Message.create({
      name,
      email,
      message,
    });

    // Send email notification to admin
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `Nouveau message de ${name}`,
        text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: newMessageEmailTemplate(name, email, message),
      });
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email:', emailError);
      // Don't fail the request if email fails, message is already saved
    }

    res.status(201).json({
      success: true,
      message: 'Message envoyé avec succès',
      data: newMessage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Erreur lors de l'envoi du message",
      error: error.message,
    });
  }
};

/**
 * @desc    Get all messages
 * @route   GET /api/messages
 * @access  Private/Admin
 */
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ read: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des messages',
      error: error.message,
    });
  }
};

/**
 * @desc    Toggle message read status
 * @route   PATCH /api/messages/:id/read
 * @access  Private/Admin
 */
const toggleReadStatus = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message non trouvé',
      });
    }

    message.read = !message.read;
    await message.save();

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du message',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete message
 * @route   DELETE /api/messages/:id
 * @access  Private/Admin
 */
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message non trouvé',
      });
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Message supprimé avec succès',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du message',
      error: error.message,
    });
  }
};

module.exports = {
  createMessage,
  getMessages,
  toggleReadStatus,
  deleteMessage,
};
