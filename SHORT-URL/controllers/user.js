const { v4: uuidv4} = require("uuid")
const User = require("../models/user");
const { setUser } = require("../service/auth");


async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    try {
        const newUser = new User({
            name,
            email,
            password,
        });

        await newUser.save();
        
        return res.redirect("/");
    } catch (err) {
        // Handle duplicate email error
        if (err.code === 11000) {
            return res.status(400).json({ message: "Email already registered." });
        }

        console.error(err);
        res.status(500).json({ message: "Error signing up user" });
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne ({ email, password });
    if (!user) {
        return res.render("login", {
            error: "Invalid Username or Password",
        });
    }

    const token = setUser(user);
    res.cookie('uid', token);
    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};
