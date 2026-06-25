import Prescription from "../model/prescription.models.js";


 const createPrescription = async (req, res) => {
  try {
    const {
      patient,
      doctor,
      appointment,
      diagnosis,
      medicines,
      instructions,
    } = req.body;

    // Validation
    if (!patient || !doctor || !appointment) {
      return res.status(400).json({
        success: false,
        message: "Patient, Doctor and Appointment are required",
      });
    }

    // Create Prescription
    const prescription = await Prescription.create({
      patient,
      doctor,
      appointment,
      diagnosis,
      medicines,
      instructions,
    });

    return res.status(201).json({
      success: true,
      message: "Prescription created successfully",
      prescription,
    });
  } catch (error) {
    console.error("Create Prescription Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default createPrescription;