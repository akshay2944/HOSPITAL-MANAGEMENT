import nodemailer from "nodemailer";
import otpHandler from "./otp.controller.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendOtpEmail = async (email,otp) => {
  try {
    await otpHandler(email)
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Email Verification OTP",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Email Verification</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
        </div>
      `,
    });


    console.log("OTP sent:", otp);

    return otp;
  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};

export default sendOtpEmail;