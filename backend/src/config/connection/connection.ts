import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = `${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`;

export default async function connectDB() {
    try {
        await mongoose.connect(mongoUri, {
            connectTimeoutMS: 10000,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 20000,
        });

        console.log('conexão estabelecida!');
    } catch (error) {
        console.error('erro ao conectar o mongodb:', error);
        process.exit(1);
    }
}
