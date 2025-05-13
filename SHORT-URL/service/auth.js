const jwt = require("jsonwebtoken");
const secret = "Aman@123&%";

function setUser(user) {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email, 
        }, 
        secret,
        {expiresIn: '1h'}
    );
}

function getUser(token) {
    if(!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch(err) {
        if (err.name === 'TokenExpiredError') {
            console.log('Token expired');
        }
    }
}

module.exports = {
    setUser,
    getUser,
}