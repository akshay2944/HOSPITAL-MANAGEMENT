import express from "express";
import { registerUser, loginUser } from "../controller/user.control.js";
import{aichatboat} from "../controller/ai.controller.js";
import medicinRegister from "../controller/medicin.controller.js"

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/chat", aichatboat);
router.post("/medicin", medicinRegister);


export default router;