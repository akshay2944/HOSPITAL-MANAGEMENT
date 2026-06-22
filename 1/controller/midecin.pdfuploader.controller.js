export const uploadImage = async (req, res) => {
  try {
    const {_idrole}=req.body
    if (!req.file||!req.user) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      file: req.file,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};