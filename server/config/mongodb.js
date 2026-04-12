import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () =>
    console.log("Database Successfully Connected"),
  );

  await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`);
};

export default connectDB; // use/call it inside entry point : index.js

// now, to store the user data on MongoDB database, we have to create the models

//DB Retry Code :

// const connectDB = async (retries = 5, delay = 2000) => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {dbName: "Any Name"});
//     console.log("✅ DB connected");
//   } catch (error) {
//     console.error("❌ DB connection failed");

//     if (retries === 0) {
//       console.error("❌ All retries failed. Exiting...");
//       process.exit(1);
//     }

//     console.log(`🔁 Retrying in ${delay / 1000}s...`);

//     await new Promise((res) => setTimeout(res, delay));

//     return connectDB(retries - 1, delay * 2); // exponential backoff
//   }
// };

// module.exports = connectDB;
