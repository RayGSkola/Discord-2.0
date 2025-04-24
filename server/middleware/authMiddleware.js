const jwt = require("jsonwebtoken"); 
const SECRET_KEY = "samma nyckel som i auth.js";

function authenticateToken(req, res, next) { //Kontrollerar att det finns en giltig cookie, innan en skyddad route körs 
    const token = req.cookies.authToken;
    if (!token) return res.redirect('/login')

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.redirect('/login')
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
