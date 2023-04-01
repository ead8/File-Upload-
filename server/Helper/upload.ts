import multer  from "multer";

const maxSize = 10000000
const storage = multer.diskStorage({
  destination: (req:any, file:any, cb:any) => {
    cb(null, "./uploads");
  },
  filename: (req:any, file:any, cb:any) => {
    const fileName : string =
            file.originalname.toLowerCase().split(" ").join("-");

    cb(null, fileName);
  },

});
const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize }
});

export default upload;
