import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`database connected sucessfully ${conn.connection.host}`);
  } catch (error) {
    console.error("error while connecting database", error);
    process.exit();
  }
};

export { connectDB };
