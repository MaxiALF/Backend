function pathHandler(req, res, next) {
  return res.json({
    statusCode: 404,
    url: `${req.method} ${req.url}`,
    message: `not found path`,
  });
}

export default pathHandler;
