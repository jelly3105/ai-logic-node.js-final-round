import express from "express";
import jwt from "jsonwebtoken";
import validateInput from "../middleware/validateInput.js";
import getUserByEmail from "../actions/getUserByEmail.js";
import getHashedPassword from "../actions/getHashedPassword.js";
import createUser from "../actions/createUser.js";
import authorizeUSer from "../middleware/authorizeUSer.js";

const routes = express.Router();
const jwtPassword = "123456";

routes.post('/sign-up', validateInput, async (req,res) => {
    const { email, password } = req.body;
    let token = '';
    try {
        await createUser(email, password);
        token = jwt.sign({ email: email }, jwtPassword);
    }catch(err) {
        return res.json(err.message)
    }
    return res.json({msg: `User signed up successfully`, token: token});
})

routes.post('/log-in', validateInput, async (req, res) => {
    const { email, password } = req.body;
    let token = '';
    try{
        // Validate if email id is already present in table
        const users = await getUserByEmail(email);
        if(!users) {
            return res.json(`User does not exist, please signup!`)
        }

        // Hash the password
        const hashedPassword = await getHashedPassword();
        // TODO
        // if(String(hashedPassword) !== String(users.password)) {
        //     return res.json('Password is incorrect!')
        // }
        token = jwt.sign({ email: email }, jwtPassword);
    } catch(err) {
        return res.json(err.message)
    }
    return res.json({msg: `User logged in successfully`, token: token})
});

routes.post('/create-user', validateInput, authorizeUSer, async (req, res) => {
    const { email, password } = req.body;
    try {
        await createUser(email, password);
    }catch(err) {
        return res.json(err.message);
    }
    return res.json(`User created successfully`)
})

routes.post('/delete-user', validateInput, async (req, res) => {
    const { email, password } = req.body;

    try {
        await createUser(email, password);
    }catch(err) {
        return res.json(err.message);
    }
    return res.json(`User created successfully`)
})

export default routes;