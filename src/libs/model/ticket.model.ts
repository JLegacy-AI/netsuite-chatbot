import mongoose, { Schema } from "mongoose";

const TicketSchema = new Schema(
  {
    threadId: { type: String, required: true },
    query: { type: String, required: true },
    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);

const Ticket =
  mongoose.models?.Ticket || mongoose.model("Ticket", TicketSchema);
export default Ticket;
