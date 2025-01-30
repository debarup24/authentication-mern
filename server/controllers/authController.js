// in this we will create different controller like : register , login , logout, password reset .. and uing the controller func we will create API end point 

import bcrypt from "bcryptjs" ;
import jwt from "jsonwebtoken" ;
import userModel from "../models/userModel.js"; 
import transporter from "../config/nodemailer.js";


  // Controller func for new registration : 
export const register = async (req, res) => {
     const {name , email, password} = req.body ;

     if(!name || !email || !password ) {
        return res.json({success: false, message: "Details Missing!"})
     } 
      try {
     // try to create user acc & store the data in the database
        
     //check existing email/user :
        const existingUser = await userModel.findOne({email}) 
          if(existingUser) { return res.json({success: false, message: "Details Missing!"}) 
        }
      const hashedPassword = await bcrypt.hash(password, 10);

         const user = new userModel({name, email, password: hashedPassword}) ;
         await user.save() ; // save user in database 

    //JWT token :
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "30d"});

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict" ,
            maxAge: 30*24*60*60*1000 , 
        }) ; 
          
        // Sending welcome Email : 
        const mailOptions = {
          from: process.env.SENDER_EMAIL ,
          to: email, // from req.body 
          subject: `Welcome ${name}`,
          text: `Hello ${name},
          Welcome to TripifAI.
          
          Your account has been created with email id : ${email}

          Plan your next trip seamlessly with TripifAI 
          
          ` 
        }

        await transporter.sendMail(mailOptions) ;

        return res.json({success: true}) ; 

      } catch (error) {
        return res.json({success: false, message: error.message})
      }
}

  // ** Controller func for user login : 

 export const login = async (req, res) => {
     
    const {email, password} = req.body ; 

    if(!email || !password) {
        return res.json({success: false, message: "Both Email and Password are required! "})
    } 
      
    try {
        const user = await userModel.findOne({email}) ; 
          if(!user) {
             return res.json({success: false, message: "Invalid Email!"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
          if(!isMatch) {
            return res.json({success: false, message: "Invalid Password!"})
          }

      // generate one token :
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "30d"});

      res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production" ,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict" ,
          maxAge: 30*24*60*60*1000 , 
      }) ;
        return res.json({success: true}) ;
      
        
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
 }


 // ** Log out controller func : 

 export const logout = async (req, res) => {
      try { 
         // for logout.. just clear the cookie
         res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict" ,
            
         }); 
         return res.json({success: true, message: "Logged Out"}) ;
        
      } catch (error) {
        return res.json({success: false, message: error.message})
      }
 }

 // user verification OTP  via email 

  export const sendVerifyOtp = async (req, res) => {
     try {
       const {userId} = req.body ;
      const user = await userModel.findById(userId) ;

      if(user.isAccountVerified) {
         return res.json({success: false, message: "Account Already Verified!"})
      }
       // generate OTP 
      const otp = String(Math.floor(100000 + Math.random() * 900000)) ; 

      user.verifyOtp = otp ;
      user.verifyOtpExpireAt = Date.now() + 24*60*60*1000 

      await user.save() ;

      // now send the otp on mail 
        const mailOption = {
          from: process.env.SENDER_EMAIL ,
          to: user.email, 
          subject: `Email Verification OTP `,
          text: `Your OTP is:  ${otp}
          
          verify your account using this OTP` ,
        }
        await transporter.sendMail(mailOption) ;

    res.json({success: true, message: "Verification OTP Sent on Email"})   
       
     } catch (error) {
      return res.json({success: false, message: error.message}) ;
     }
  }

  // verifying email by putting the OTP 
    
      export const verifyEmail = async (req, res) => {

         const {userId , otp} = req.body ;

         if(!userId || !otp) {
          return res.json({success:  false, message: "Details Missing!"})
         }

         try {
            const user = await userModel.findById(userId) ;
            
            if(!user) {
              return res.json({success: false, message: "User Not Found!"}) ;
            }
          if(user.verifyOtp === "" || user.verifyOtp !== otp){
            return res.json({success: false, message: "Invalid OTP !"}) ;
          }

       // Check expiry date of OTP 
          if(user.verifyOtpExpireAt < Date.now()) {
            return res.json({success: false, message: "OTP Expired !"}) ;

          }

          user.isAccountVerified = true ; 

          // reset otp & expire at
           user.verifyOtp = ""
           user.verifyOtpExpireAt = 0 ;

           await user.save() ;
           
           return res.json({success: true, message: "Email Verified Successfully!"}) ;

         } catch (error) {
          return res.json({success: false, message: error.message}) ; 
         }

      }

  // ** Check user is already Logged In or not ? 

    export const isAuthenticated = async (req, res) => {

       try {
          return res.json({success: true}) ;
       } catch (error) {
        return res.json({success: false, message: error.message}) ; 
       }
    }


  
  // ** Send Password reset OTP 
   
      export  const sendResetOtp = async (req, res) => {
         const {email} = req.body;

         if(!email) {
          return res.json({success: false, message: "Email is required!"}) ;
         }

         try {
           
          const user = await userModel.findOne ({email}) ;

            if(!user) {
              return res.json({success: false, message: "User Not Found with this Email"}) ;
            }
          

        // Now if user is available : generate a OTP, that otp will be saved in the database, and that otp will be send on email 
        const otp = String(Math.floor(100000 + Math.random() * 900000)) ; 

        user.resetOtp = otp ;
        user.resetOtpExpireAt = Date.now() + 15*60*1000 

        await user.save() ;

       // now send the otp on mail 
        const mailOption = {
          from: process.env.SENDER_EMAIL ,
          to: user.email, 
          subject: `Password Reset OTP `,
          text: `Your OTP for the password reset is:  ${otp}
          
          Please reset your password using this OTP` ,
        }
        await transporter.sendMail(mailOption) ;
         
        return res.json({success: true, message: "OTP Sent to your registered Email"}) ;
           
           
         } catch (error) {
          return res.json({success: false, message: error.message}) ;
         }
      }
    

  // ** Reset password by using OTP 
  
      export const resetPassword = async (req, res) => {

          const {email , otp, newPassword} = req.body ;

          if(!email || !otp || !newPassword) {
            return res.json({success: false, message: "Details Missing! Email, OTP and New Password is required "}) ;  
          }

          try {
              const user = await userModel.findOne({email})  ;
              
              if(!user) {
                return res.json({success: false, message: "User Not Found!"}) ;
              }

            // if user is available, but problem is in the OTP 
               if (user.resetOtp === "" || user.resetOtp !== otp ) {
                return res.json({success: false, message: "Invalid OTP !"}) ;
               }

            // if OTP has expired 
               if(user.resetOtpExpireAt < Date.now()) {
                return res.json({success: false, message: "OTP Expired!"}) ;
               }

            // Everything is Fine : Update the user Password now 
             const hashedPassword = await bcrypt.hash(newPassword, 10) ;

             user.password = hashedPassword ;
             user.resetOtp = "" ;
             user.resetOtpExpireAt = 0 ;

             await user.save() ; 

             return res.json({success: true, message: "Password has been reset successfully"}) ;

          } catch (error) {
            return res.json({success: false, message: error.message}) ;
          }
      }    
      
      //User not authenticated.Login again 