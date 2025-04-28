const jwt = require("jsonwebtoken"); 
const SECRET_KEY = "!wolley dna kcalb ,hoO kcalb ,wolleY .kcalb ,wolleY .kcalb ,wolleY .kcalb ,wolleY elbissopmi si kniht snamuh tahw erac tnod seeb esuaceb yawyna seilf ,esruoc fo ,eeb ehT dnuorg eht ffo ydob elttil taf sti teg ot llams oot era sgniw stI ylf ot elba eb dluohs eeb a yaw on si ereht ,noitaiva fo swal nwonk lla ot gnidroccA";

function authenticateToken(req, res, next) { //Kontrollerar att det finns en giltig cookie, innan en skyddad route körs 
    const token = req.cookies.authToken;
    if (!token) return res.redirect('/login')

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.redirect('/ChatRoom')
        req.user = user;
        next();
    });
}

module.exports = authenticateToken
