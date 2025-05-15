const jwt = require("jsonwebtoken"); 
const SECRET_KEY = "!wolley dna kcalb ,hoO kcalb ,wolleY .kcalb ,wolleY .kcalb ,wolleY .kcalb ,wolleY elbissopmi si kniht snamuh tahw erac tnod seeb esuaceb yawyna seilf ,esruoc fo ,eeb ehT dnuorg eht ffo ydob elttil taf sti teg ot llams oot era sgniw stI ylf ot elba eb dluohs eeb a yaw on si ereht ,noitaiva fo swal nwonk lla ot gnidroccA";

function authenticateToken(req, res, next) {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).json({ error: "Token saknas" });

    jwt.verify(token, SECRET_KEY, (err, username) => {
        if (err) return res.status(403).json({ error: "Ogiltig token" });

        req.user = username; // Här måste user innehålla username!
        next();
    });
}



module.exports = authenticateToken
