import bcrypt from "bcrypt";
import mongoose from "mongoose";

interface IUser {
  username: string;
  password: string;
}

export interface UserDocument extends IUser, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password).catch((_) => false);
};

userSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = doc._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
    delete returnedObj.password;
    delete returnedObj.createdAt;
    delete returnedObj.updatedAt;
  },
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
