import mongoose from "mongoose";

export const connectDB = async () => {
    try {
          const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`ts works mongodb ${conn.connection.host}`)
 } catch(error) {
        console.log(`fuck ts${error}`)
    }
}