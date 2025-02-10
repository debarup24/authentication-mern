// find the token from the cookie and.. from that token it will find the userId 

import jwt from "jsonwebtoken" ; 

const userAuth = async (req, res, next) => {
    // in next it will execute our controller function
    const {token} = req.cookies ; 

    if(!token) {
        return res.json({success: false, message: "Not Authorized! Login Again "}) ;
    }

    try {
         
      const tokenDecode = jwt.verify(token, process.env.JWT_SECRET) ;

    // from this token decode Find the userId 
        
     if(tokenDecode.id) {
        req.body.userId = tokenDecode.id  // adding decoded token (which is basically the user Id )  to req.body  
     }
      else {
        return res.json({success: false, message: "Not Authorized! Login Again "}) ;
      }

    // next() will try to call / execute controller function 

      next()


    } catch (error) {
        return res.json({success: false, message: error.message}) ;
    }
}

export default userAuth ;