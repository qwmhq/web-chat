import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timestamp: { type: Date, default: Date.now },
  delivered: { type: Boolean, default: false },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
