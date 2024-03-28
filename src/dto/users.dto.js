import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

class UserDTO {
  constructor(data) {
    argsUtil.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex"));
    this.name = data.name;
    this.photo =
      data.photo ||
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    this.email = data.email;
    this.password = data.password;
    this.role = data.role || 0;
    this.verified = data.verified || false;
    this.verifiedCode = crypto.randomBytes(12).toString("base64");
    argsUtil.env !== "prod" && (this.updatedAt = new Date());
    argsUtil.env !== "prod" && (this.createdAt = new Date());
  }
}

export default UserDTO;
