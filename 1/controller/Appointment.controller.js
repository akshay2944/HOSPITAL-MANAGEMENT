import Appointment from "../model/appointment.models.js";
import Patient from "../model/patient.models.js";
import Doctor from "../model/doctor.models.js";

const createAppointment = async (req, res) => {
  try {
    const { patient, doctor, appointmentDate } = req.body;

    // Validation
    if (!patient || !doctor || !appointmentDate) {
      return res.status(400).json({
        success: false,
        message: "Patient, Doctor and Appointment Date are required",
      });
    }

    // Check Patient Exists
    const existingPatient = await Patient.findById(patient);
    if (!existingPatient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    // Check Doctor Exists
    const existingDoctor = await Doctor.findById(doctor);
    if (!existingDoctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Generate Token Number
    const tokenNumber =
      (await Appointment.countDocuments({
        doctor,
        appointmentDate: {
          $gte: new Date(
            new Date(appointmentDate).setHours(0, 0, 0, 0)
          ),
          $lt: new Date(
            new Date(appointmentDate).setHours(23, 59, 59, 999)
          ),
        },
      })) + 1;

    // Create Appointment
    const appointment = await Appointment.create({
      patient,
      doctor,
      appointmentDate,
      tokenNumber,
    });

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.error("Create Appointment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export default createAppointment;