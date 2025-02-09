import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on ("connected", () => console.log("Database Successfully Connected")) ;

    await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`) ;
} ;

export default connectDB ;

// now, to store the user data on MongoDB database, we have to create the models