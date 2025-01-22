import getUserByEmail from './getUserByEmail.js';
import getHashedPassword from './getHashedPassword.js';
import User from '../models/User.js';

export default async function createUser(email,password) {
    // Validate if email id is already present in table
    const users = await getUserByEmail(email);
    if(users) {
        throw new Error(`User already exists!`)
    }

    // Hash the password
    const hashedPassword = await getHashedPassword(password);

    // Store in the database
    await User.create({ email: email, password: hashedPassword });
}