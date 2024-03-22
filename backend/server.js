import http from "http";
import "dotenv/config";
import app from "./src/app.js";
import logger from "./src/utils/Logger.js";

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});
