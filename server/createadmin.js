const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("./models/User.model"); // عدّل المسار إذا لزم

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({
      email: "abadran281@gmail.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      "qpzm1223",
      parseInt(process.env.HASH_PASS || 10),
    );

    const admin = await User.create({
      name: "Administrator",
      email: "abadran281@gmail.com",
      phoneNumber: "0599999999",
      password: hashedPassword,
      role: "user",
      avatar: "",
    });

    console.log("Admin created successfully");
    console.log({
      email: admin.email,
      role: admin.role,
    });

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

createAdmin();
