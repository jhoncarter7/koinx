import mongoose from "mongoose"

const mongodbConnection = async() => {
try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}`)

console.log(`MongoDB connected: ${connection.connection.host}`);
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
}
}

export default mongodbConnection;