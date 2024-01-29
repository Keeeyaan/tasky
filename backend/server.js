import http from "http";
import app from "./src/app.js";
import logger from "./src/logger/index.js";

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});
