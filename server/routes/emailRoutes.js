import express from "express" ;
// import userAuth from "../middleware/userAuth.js";
//import { getUserData } from "../controllers/userController.js";
import { sendEmail } from "../controllers/emailController.js";

const emailRouter = express.Router() ;

// userRouter.get("/data", userAuth, getUserData) ;
emailRouter.post("/send-ai-email" , sendEmail) ;


export default emailRouter;