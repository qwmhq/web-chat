import { after, before } from "node:test";
import mongoose from "mongoose";
import config from "../src/utils/config";

before(async () => {
  await mongoose.connect(config.MONGODB_URI);
});

after(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});
