import multer from "multer";

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;

    if (file.fieldname === "profile") {
      uploadPath = "./public/profiles";
    } else if (file.fieldname === "product") {
      uploadPath = "./public/products";
    } else {
      uploadPath = "./public/documents";
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
