import __dirname from "../../utils.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = '';
    switch (file.fieldname) {
      case 'profile':
        folder = 'profiles';
        break;
      case 'product':
        folder = 'products';
        break;
      case 'document':
        folder = 'docs';
        break;
      default:
        folder = 'others';
    }
    cb(null, path.join(__dirname, `public/${folder}`));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploader = multer({ storage });

export default uploader;
