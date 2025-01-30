import { Message } from "../models/messageSchema.js";

export const sendMessage = async (req, res) => {
  try {
    console.log("Incoming Request:", req.body); // Log request data

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const savedMessage = await Message.create({ name, email, subject, message });

    console.log("Saved Message:", savedMessage); // Log saved message

    res.status(200).json({
      success: true,
      message: "Message Sent Successfully!",
    });
  } catch (error) {
    console.error("Database Error:", error); // Log actual error

    if (error.name === "ValidationError") {
      let errorMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(" ");
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
