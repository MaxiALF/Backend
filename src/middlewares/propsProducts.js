function propsProducts(req, res, next) {
  const { title, price } = req.body;
  if (!title || !price) {
    return res.status(400).error400("Title & Price are required!")
  } else {
    return next();
  }
}

export default propsProducts;
