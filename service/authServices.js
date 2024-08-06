const jwt=require('jsonwebtoken');
require('dotenv').config();
const {Registration}=require('../model/registration.modal')


const SECRET_KEY=process.env.JWT_SECRET;


//function to genrate the JWT Token
const generateToken = (data)=>{
    console.log(data);
    return jwt.sign(data, SECRET_KEY, { expiresIn: '1h' });

}




module.exports={
    generateToken,
 };
