import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error('Please define the MONGO_URI environment variable');
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version


async function run() {
  try {
    console.log('Connecting to MongoDB with Mongoose...');
    await mongoose.connect(uri);
    console.log("Mongoose successfully connected to MongoDB!");
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  } finally {
    // Mongoose manages connections, no explicit close needed here unless for specific scenarios
  }
}

export const connect = run;
export const getMongooseConnection = () => mongoose.connection;