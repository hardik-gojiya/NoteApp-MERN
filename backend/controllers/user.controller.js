import { User } from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiErrors.js";
import { ApiResponse } from "../utils/apiResponse.js";

//register user
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, avtar } = req.body;

  const existUser = await User.findOne({ $nor: [{ username, email }] });
  if (existUser) {
    return res
      .status(401)
      .json(new ApiResponse(200, {}, "User or username already exists"));
  }

  const user = await User.create({
    username,
    email,
    password,
    avtar,
  });

  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    return res.json(new ApiResponse(200, {}, "failed to create user"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        201,
        { createdUser, token: user.generateToken(user._id) },
        "User created succesfully"
      )
    );
});

//login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the email and password are provided
  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Email and password are required"));
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "User does not exist"));
  }

  // Validate password
  const isPasswordMatch = await user.isPasswordCorrect(password);
  if (!isPasswordMatch) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Invalid credentials"));
  }

  // Fetch user details without password and add token
  const loggedInUser = await User.findById(user._id).select("-password");
  if (!loggedInUser) {
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Failed to login user"));
  }

  const userObject = loggedInUser.toObject();
  userObject.token = user.generateToken(user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, userObject, "Login successful"));
});

const edituser = asyncHandler(async (req, res) => {
  const { _id, name, email, password, avtar } = req.body;
  console.log(_id, name, email, password, avtar);
});

export { registerUser, loginUser, edituser };
