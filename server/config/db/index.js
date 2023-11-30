const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.f8vwztn.mongodb.net/mern-learnit?retryWrites=true&w=majority`
    );
    console.log("Connect successfully!");
  } catch (error) {
    console.log("Connect error");
  }
};

module.exports = { connectDB };
