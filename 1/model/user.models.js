import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    username:{
      type:String,
      required:true,
      unique:true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    pincode: {
      type: Number,
      required: true,
    },

    role: {
      type: String,
      enum: [
        "patient",
        "doctor",
        "nurse",
        "admin",
        "receptionist",
      ],
      default: "patient",
    },

    refreshToken: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);
userSchema.methods.hashpassward = async (password) => {
  const hashespassword = bcrypt.hash(password,9)
  return hashespassword
  
}

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(
        password,
        this.password
    );
};
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        process.env.ACCESS_SECRET_KEY,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRETIME
        }
    );
};
userSchema.methods.generateRefreshToken= function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        process.env.REFRESH_SECRET_KEY,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRETIME
        }
    );
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password"))
    return next();

  this.password = await bcrypt.hash(
    this.password,
    10
  );

  next();
});


const User = mongoose.model(
  "User",
  userSchema
);

export default User;