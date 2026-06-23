import express from "express";
import { registerUser, loginUser } from "../controller/user.control.js";
import{aichatboat} from "../controller/ai.controller.js";
import verifyAccessToken from "../middleware/user.middleware.js";
import otpHandler from "../controller/otp.controller.js";
import { uploadmedicin } from "../controllers/medicine.controller.js";
import { getAllMedicines } from "../controller/allmedicin.get.js";
import { getMedicineById } from "../controller/allmedicin.get.js";
import { deleteMedicine } from "../controller/allmedicin.get.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/chat", aichatboat);
router.post("/otp",otpHandler)
router.post("/add", uploadmedicin);
router.get("/", getAllMedicines);
router.get("/:id", getMedicineById);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);

export default router;