import jwt from "jsonwebtoken";
import getUserByEmail from "../actions/getUserByEmail.js";
const jwtPassword = "123456";

export default async function authorizeUSer(req, res, next) {
    const token = req.headers.authorization;
    try{
        const {email} = (jwt.verify(token, jwtPassword));
        const user = await getUserByEmail(email);
        if(!user) {
            return res.json(`Token is invalid`)
        }
        
    }catch(err) {
        return res.json(err.message)
    }
    next();
}