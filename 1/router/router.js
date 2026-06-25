import express from "express";
import { registerUser, loginUser } from "../controller/user.control.js";
import{aichatboat} from "../controller/ai.controller.js";
import {medicinRegister,getAllMedicines} from "../controller/medicin.controller.js";
import  createPrescription  from "../controller/Prescription.controller.js";
import  createAppointment  from "../controller/Appointment.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/chat", aichatboat);
router.post("/medicin",medicinRegister);
router.get("/allmedicin",getAllMedicines);
router.post("/prescriptioncreate", createPrescription);
router.post("/book", createAppointment);

export default router;