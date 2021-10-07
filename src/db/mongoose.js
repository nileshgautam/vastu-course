const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo connected ${connection.connections[0].host}`);
  } catch (e) {
    console.log("error: ", e);
  }
};

module.exports = connectDB;


