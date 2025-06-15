const User = require("../models/user.model");
const httpStatusCode = require("http-status");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const Login = async (request, response) => {
  const { email, password } = request.body;
  console.log("Request received From Login", request.body);

  if (!email || !password) {
    return response.status(400).json({ message: "All Fields Are Required" });
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return response.status(404).json({ message: "User Not Found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return response.status(401).json({ message: "Invalid Credentials" });
    }

    const token = crypto.randomBytes(20).toString("hex");

    // optional: save token to DB if your model supports it
    existingUser.token = token;
    await existingUser.save();

    return response
      .status(200)
      .json({ token: token, message: "Login successful" });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Something Went Wrong: " + error.message });
  }
};

const Register = async (request, response) => {
  console.log("Request received From Signup", request.body);
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    return response.status(400).json({ message: "All Fields Are Required" });
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return response.status(409).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 13);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return response.status(201).json({
      message: "Congratulations! Registration Successful",
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Something Went Wrong: " + error.message });
  }
};

module.exports = { Register, Login };
