import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

class ProductDTO {
  constructor(data) {
    argsUtil.env !== "prod", "dev" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.title = data.title;
    this.photo =
      data.photo ||
      "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-600nw-1552421075.jpg";
    this.price = data.price;
    this.stock = data.stock;
    argsUtil.env !== "prod", "dev" && (this.updatedAt = new Date());
    argsUtil.env !== "prod", "dev" && (this.createdAt = new Date());
  }
}

export default ProductDTO;
