import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
{
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    verifiy:{
        type:Boolean,
        required:true,
        default:false
    },
    refreshtoken: {
        type: String,
        default:undefined,
    }
    
},
{
    timestamps: true
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
userSchema.pre("save", async function hashpassward() {
    if (!this.isModified("password")) return ;

    this.password = await bcrypt.hash(this.password, 11)
    return;
});

const User = mongoose.model("User", userSchema);

export default User;