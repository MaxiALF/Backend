import logger from "../utils/logger/index.js";

function errorHandler(error, req, res, next) {
  let statusCode = error.statusCode || 500;
  if (!error.statusCode || error.statusCode === 500) {
    error.statusCode = 500;
    logger.FATAL(error.message);
  } else {
    logger.ERROR(error.message);
  }
  return res.status(statusCode).json({
    statusCode: error.statusCode,
    url: `${req.method} ${req.url}`,
    message: error.message,
  });
}

export default errorHandler;
