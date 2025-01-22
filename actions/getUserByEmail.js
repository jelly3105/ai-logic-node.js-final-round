import User from "../models/User.js";
export default async function getUserByEmail(email) {
    return await User.findOne({where: {email : email}});
}