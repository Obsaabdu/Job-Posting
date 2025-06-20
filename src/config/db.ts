import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Database Connected!")
    } catch (err) {
        console.error('Database connection error!', err);
        process.exit(1);
    }
};