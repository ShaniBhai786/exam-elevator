import mongoose from "mongoose"

const connectDB = async () => {
    try {
        if (mongoose.connections[0].readyState) return;

        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB Connected Successfully...!")
    } catch (error) {
        console.error("MongoDB connection failed!!!", error)
        throw error
    }
}

export {connectDB}