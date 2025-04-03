import { Router } from "express";
import { Login, Register } from "../controller/authController.js";
import multer from "multer";
import path from "path";

const router = Router();
const storage = multer.diskStorage({
  destination: "./profiles",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/register", upload.single("avatar"), Register);
router.post("/login", Login);

export default router;
