import Medicine from "../model/medicin.models.js";
const medicinRegister = async (req, res) => {
  try {
    const {
      name,
      manufacturer,
      category,
      price,
      stock,
      expiryDate,
      description,
    } = req.body;

    // Validation
    if (
      !name ||
      !manufacturer ||
      !category ||
      !price ||
      !stock ||
      !expiryDate
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory",
      });
    }

    // Check if medicine already exists
    const existingMedicine = await Medicine.findOne({
      name,
      manufacturer,
    });

    if (existingMedicine) {
      return res.status(409).json({
        success: false,
        message: "Medicine already exists",
      });
    }

    // Create medicine
    const medicine = await Medicine.create({
      name,
      manufacturer,
      category,
      price,
      stock,
      expiryDate,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Medicine registered successfully",
      medicine,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default medicinRegister;