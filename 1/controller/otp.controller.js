import Otp from "../model/Otp.models.js";
import sendOtpEmail from "./sendEmail.js";
import User from "../model/user.models.js";



const otpHandler = async (email) => {
  try {
    // Remove old OTPs
    await Otp.deleteMany({ email });

    // Generate 6-digit OTP
    const generatedotp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const otp = await Otp.create({
      email,
      otp: generatedotp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
    });

    await sendOtpEmail(email, generatedotp);

    return otp;
  } catch (error) {
    throw new Error(error.message);
  }
};


const otpVerification = async (req,res) => {
  const {email, otpCode}=req.body;

  const otpRecord = await Otp.findOne({
    email,
    otp: otpCode,
  });

  if (!otpRecord) {
    throw new Error("Invalid OTP");
  }

  if (otpRecord.expiresAt < new Date()) {
    await Otp.deleteOne({ _id: otpRecord._id });
    throw new Error("OTP Expired");
  }
  const updateuser= await User.findOne(email);
  if (!updateuser) {
    throw new Error("user not found")
    
  };
  await User.updateOne(
  { email: "test@gmail.com" },
  { $set: {verifiy: true } } 
);


  await Otp.deleteMany({ email });

  return true;
}; 


export default otpHandler;