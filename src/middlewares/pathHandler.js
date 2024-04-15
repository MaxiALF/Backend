import logger from "../utils/logger/index.js";

function pathHandler(req, res, next) {
  logger.ERROR(`${req.method} ${req.url} not found path`)
  return res.json({
    statusCode: 404,
    url: `${req.method} ${req.url}`,
    message: `not found path`,
  });
}

export default pathHandler;
