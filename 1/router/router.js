import express from "express";
import { registerUser, loginUser } from "../controller/user.control.js";
import{aichatboat} from "../controller/ai.controller.js";
import { getAllMedicines } from "../controller/allmedicin.get.js";
import { getMedicineById } from "../controller/allmedicin.get.js";
import { deleteMedicine } from "../controller/allmedicin.get.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/chat", aichatboat);

router.get("/", getAllMedicines);
router.get("/:id", getMedicineById);
router.delete("/:id", deleteMedicine);

export default router;