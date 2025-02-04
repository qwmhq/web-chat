import "dotenv/config";
import mongoose from "mongoose";
import { createServer } from "http";

import config from "./utils/config";
import logger from "./utils/logger";
import app from "./app";
import io from "./socket";

const PORT = process.env.PORT || 3001;

logger.info("connecting to database...");
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to database");
  })
  .catch((error) => {
    logger.error("couldn't connect to database:", error.message);
  });

const server = createServer(app);
io.attach(server);

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
