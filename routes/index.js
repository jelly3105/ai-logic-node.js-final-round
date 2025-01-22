import express from "express";
import validateInput from "../middleware/validateInput.js";
import getUserByEmail from "../actions/getUserByEmail.js";
import getHashedPassword from "../actions/getHashedPassword.js";
import createUser from "../actions/createUser.js";

const routes = express.Router();

routes.post('/sign-up', validateInput, async (req,res) => {
    const { email, password } = req.body;
    try {
        await createUser(email, password);
    }catch(err) {
        return res.json(err.message)
    }
    return res.json(`User signed up successfully`)
})

routes.post('/log-in', validateInput, async (req, res) => {
    const { email, password } = req.body;
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
    return res.json(`User logged in successfully`)
});

routes.post('/create-user', validateInput, async (req, res) => {
    const { email, password } = req.body;
    try {
        await createUser(email, password);
    }catch(err) {
        return res.json(err.message);
    }
    return res.json(`User created successfully`)
})

export default routes;