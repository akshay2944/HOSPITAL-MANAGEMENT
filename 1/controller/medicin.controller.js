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
    const decodeduser = req.body.refreshtoken

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
    const medicines = await Medicine.create({
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
      medicines,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();

    res.status(200).json({
      success: true,
      medicines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addcart = async(req ,res)=>{
    
};

export  {medicinRegister , getAllMedicines};