import bcrypt from 'bcrypt';

export default async function getHashedPassword(password){
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}
