import mongoose from "mongoose";

 // creating Schema 
const emailSchema = new mongoose.Schema({
    // in this define the structure of the user data - name, email, password .. 
    
    recipientEmail: {type: String, required: true },
    emailSubject: {type: String, required: true } ,
    generatedEmailBody: {type: String, required: true } ,


 })
    
   // using the above user schema create userModel
 const emailModel = mongoose.models.EmaiData || mongoose.model("EmailData" , emailSchema) ; 

 export default emailModel ;