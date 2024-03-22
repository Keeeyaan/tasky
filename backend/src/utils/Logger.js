import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL,
  timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;
