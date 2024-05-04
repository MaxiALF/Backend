import products from "../data/mongo/products.mongo.js";

async function checkUser(req, res, next) {
  try {
    const user = req.user._id;
    const { pid } = req.params;
    const product = await products.readOne(pid);
    if (req.user.role !== 2) {
      return res.error403("Forbidden!");
    }
    if (product.owner_id.toString() !== user.toString()) {
      return res.error403("Forbidden!");
    }
    next();
  } catch (error) {
    return next(error);
  }
}

export default checkUser;
