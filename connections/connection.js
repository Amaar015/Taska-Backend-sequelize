import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected ...`.bgGreen.white);
  } catch (err) {
    console.log(`${err} occurs`.bgRed.white);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;



// password sw7HIGt27EIpJpOx
//  username razaammar582