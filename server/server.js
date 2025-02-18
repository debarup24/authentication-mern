import express from "express" ;
import cors from "cors" ;
import "dotenv/config" ;
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import emailRouter from "./routes/emailRoutes.js";


const app = express() ;
connectDB();
const port = process.env.PORT || 4000

const allowedOrigins = [ "http://localhost:5174" , "https://auth-mern-client-delta.vercel.app"]

app.use(express.json()) ;
app.use (cookieParser()) ;
app.use (cors({origin: allowedOrigins , credentials: true})) ;

// API Endpoints
app.get('/', (req, res) => res.send("Hello Ji.. API Working fine")) ;
app.use("/api/auth", authRouter) ;
app.use("/api/user", userRouter) ;
app.use("/api/email", emailRouter) ;

app.listen(port, () => console.log(`Server sucessfully started on PORT : ${port}`)) ;