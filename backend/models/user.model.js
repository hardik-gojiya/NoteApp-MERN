import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avtar: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  if (
    typeof enteredPassword !== "string" ||
    typeof this.password !== "string"
  ) {
    throw new Error("password must be strings");
  }

  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};


export const User = mongoose.model("User", userSchema);


