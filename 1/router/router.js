import express from "express";
import { registerUser, loginUser } from "../controller/user.control.js";
import{aichatboat} from "../controller/ai.controller.js";
import verifyAccessToken from "../middleware/user.middleware.js";
import otpHandler from "../controller/otp.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/chat", aichatboat);
router.post("/otp",otpHandler)

export default router;