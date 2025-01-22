export default function validateInput(req, res, next) {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.json('Email and password are required!');
    }

    next();
}