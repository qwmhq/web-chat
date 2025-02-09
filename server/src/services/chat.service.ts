import { DirectChat } from "../models/chat.model";

const getChats = async (userId: string) => {
  const rgx = new RegExp(userId, "gi");
  const chats = await DirectChat.find({ _id: rgx }).populate("participants");
  return chats;
};

const sendDm = async (sender: string, receiver: string, message: string) => {
  const chatId = [sender, receiver]
    .sort((a, b) => a.toString().localeCompare(b.toString()))
    .join("_");

  let chat = await DirectChat.findById(chatId);

  const newMessage = {
    text: message,
    senderId: sender,
    timestamp: Date.now(),
    delivered: false,
    read: false,
  };

  if (!chat) {
    chat = await DirectChat.create({
      participants: [sender, receiver],
      messages: [newMessage],
    });
  } else {
    chat.messages.push(newMessage);
    await chat.save();
  }

  return newMessage;
};

export default { sendDm, getChats };
