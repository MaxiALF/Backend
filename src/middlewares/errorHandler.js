function errorHandler(error, req, res, next) {
  console.log(error);
  return res.status(error.statusCode || 500).json({
    statusCode: error.statusCode || 500,
    url: `${req.method} ${req.url}`,
    message: error.message,
  });
}

export default errorHandler;
