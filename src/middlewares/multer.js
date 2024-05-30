import multer from "multer";
import __dirname from "../../utils.js"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "other"; 
    if (file.fieldname === "userPhoto") {
      folder = "profiles";
    } else if (file.fieldname === "productPhoto") {
      folder = "products";
    } else if (file.fieldname === "document") {
      folder = "documents";
    }
    cb(null, path.join(__dirname, `/public/${folder}`));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const uploader = multer({ storage });

export default uploader;