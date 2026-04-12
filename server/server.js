import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import emailRouter from "./routes/emailRoutes.js";

const app = express();
connectDB();

// connectDB() Can be written in production level : We should wait for DB before starting server -
//   const startServer = async () => {
//     try {
//       await connectDB();

//       app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//       });
//     } catch (error) {
//       console.error("Failed to start server:", error);
//       process.exit(1);
//     }
//   };

//   startServer();

const port = process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:5174",
  "https://auth-mern-client-delta.vercel.app",
];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true })); // here credentials: true mean it tells the browser: It’s allowed to send credentials like cookies, JWT Token.. with cross-origin requests. By default, browsers block credentials in cross-origin requests

// API Endpoints
app.get("/", (req, res) => res.send("Hello Ji.. API Working fine"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/email", emailRouter);

app.listen(port, () =>
  console.log(`Server sucessfully started on PORT : ${port}`),
);

app.listen(port, () =>
  console.log(`Server sucessfully started on PORT : ${port}`),
);

// Basic Express-Server structure :
// import express from "express";
// import dotenv from "dotenv";

// dotenv.config();

// const port = process.env.PORT || 5000;

// const app = express();

// app.get("/", (req, res) => {
//   res.send("Hi DEBARUP, Server is running Successfully! ");
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
