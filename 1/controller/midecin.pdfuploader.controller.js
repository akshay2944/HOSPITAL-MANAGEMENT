import Medicine from "../model/midecin.models.js";

export const uploadmedicin = async (req, res) => {
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

    const medicine = await Medicine.create({
      name,
      manufacturer,
      category,
      price,
      stock,
      expiryDate,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Medicine added successfully",
      medicine,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};