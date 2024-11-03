const mongoose = require("mongoose");

const conn = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected   success to DB");
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
};

module.exports = conn;
