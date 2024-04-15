import logger from "./logger/index.js";

process.on("exit", (code) =>
  logger.INFO("The process has been ended with code " + code)
);

process.on("uncaughtException", (error) =>
  logger.INFO("Se ha producido un error: " + error.message)
);

logger.INFO(process.pid);
process.pid();
process.exit(0);
