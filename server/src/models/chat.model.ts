import mongoose, { ObjectId } from "mongoose";

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timestamp: { type: Date, default: Date.now },
  delivered: { type: Boolean, default: false },
  read: { type: Boolean, default: false },
});

const directChatSchema = new mongoose.Schema({
  participants: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    validate: [
      (x: ObjectId[]) => x.length == 2,
      "must have exactly 2 participants!",
    ],
    required: true,
  },
  _id: { type: String },
  messages: [messageSchema],
});

directChatSchema.pre("save", function (next) {
  if (this.isNew) {
    const [firstUser, secondUser] = this.participants.sort((a, b) =>
      a.toString().localeCompare(b.toString()),
    );

    this._id = `${firstUser}_${secondUser}`;
  }
  next();
});

directChatSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = doc._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

export const DirectChat = mongoose.model("DirectChat", directChatSchema);

const groupChatSchema = new mongoose.Schema({
  participants: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    validate: [
      (x: ObjectId[]) => x.length == 2,
      "must have exactly 2 participants!",
    ],
    required: true,
  },
  messages: [messageSchema],
});

groupChatSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = doc._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

export const GroupChat = mongoose.model("GroupChat", groupChatSchema);
