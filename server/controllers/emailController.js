
import emailModel from "../models/emailModel.js"; 
import transporter from "../config/nodemailer.js";


export const sendEmail = async (req, res) => {
    const {recipientEmail , emailSubject, generatedEmailBody} = req.body ;

    if(!recipientEmail || !emailSubject || !generatedEmailBody ) {
       return res.json({success: false, message: "Details Missing!"})
    } 
     try {
    // try to create user acc & store the data in the database
       
    
    // const hashedEmailBody = await bcrypt.hash(generatedEmailBody, 10);
          // user = aiMail
        const aiMail = new emailModel({recipientEmail , emailSubject, generatedEmailBody}) ;
        await aiMail.save() ; // save data in database 

   //JWT token :
    //    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "30d"});

    // After generating this token we have to send this token to users in the response and in the response we will add the cookie!   

    //    res.cookie("token", token, {
    //        httpOnly: true,
    //        secure: process.env.NODE_ENV === "production" ,
    //        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict" ,
    //        maxAge: 30*24*60*60*1000 , 
    //    }) ; 
         
       // Sending welcome Email : 
       const mailOptions = {
         from: process.env.SENDER_EMAIL ,
         to: recipientEmail, // from req.body 
         subject: `${emailSubject}`,
         text: `${generatedEmailBody},
         
         Successfull! 
         
         ` 
       }

       await transporter.sendMail(mailOptions) ;

       return res.json({success: true}) ; 

     } catch (error) {
       return res.json({success: false, message: error.message})
     }
}

