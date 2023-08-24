// const User = require('../models/User')
// const jwt = require('jsonwebtoken')
// require('dotenv').config();

// const auth = async (req,res,next)=>{
//     try{
//         const authorizationHeader = req.header('Authorization');
//         if (!authorizationHeader) {
//             return res.status(401).json({ message: 'No token provided' });
//         }
//         const token = req.header('Authorization').replace('Bearer ' , "")

//         const decoded = jwt.verify(token , process.env.JWT_SECRET)

//         const user = await User.findOne({_id:decoded._id , 'tokens.token':token})

//         if(!user){
//             throw new Error('')
//         }
//         req.token = token
//         req.user = user
//         next()
//     }catch(e){
//         res.status(401).send({error : "unAuthorized"})
//     }
// }



// module.exports = auth