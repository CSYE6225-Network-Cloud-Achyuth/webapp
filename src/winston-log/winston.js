import winston, { createLogger, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: {
    service: "webapp",
  },
  transports: [
    new transports.File({ filename: "./logs/error.log", level: "error" }),
    new transports.File({ filename: "./logs/combined.log" }),
  ],
});

export { logger, winston };
