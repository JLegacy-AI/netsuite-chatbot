// libs/models/chats.model.js
import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
  role: { type: String, required: true }, // 'user' or 'assistant'
  content: { type: String, required: true },
  time: { type: Date, default: Date.now }, // Timestamp of the message
});

const chatSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    threadId: { type: String, required: true, unique: true },
    messages: [messageSchema],
  },
  { timestamps: true }
);

const Chat = mongoose.models?.Chat || mongoose.model("Chat", chatSchema);
export default Chat;
