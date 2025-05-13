import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

export const verifyTokenMiddleware = (req, res, next) => {
    try{
    const token = req.headers['authorization']?.split(' ')[1];

    const isVarified = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = decoded;
        console.log("decoded", decoded);
        next();
    });


    }catch(err){
        return res.status(401).json({ message: "Unauthorized" });
    }
};