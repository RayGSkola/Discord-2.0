const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UsersDB = require("../models/UsersDB.js");

const router = express.Router();
const SECRET_KEY = "!wolley dna kcalb ,hoO kcalb ,wolleY .kcalb ,wolleY .kcalb ,wolleY .kcalb ,wolleY elbissopmi si kniht snamuh tahw erac tnod seeb esuaceb yawyna seilf ,esruoc fo ,eeb ehT dnuorg eht ffo ydob elttil taf sti teg ot llams oot era sgniw stI ylf ot elba eb dluohs eeb a yaw on si ereht ,noitaiva fo swal nwonk lla ot gnidroccA";


router.post("/register", async (req, res) => {
  const { Username, Displayname, Email, Password } = req.body;

  try {
    const existingUser = await UsersDB.getUserByUsername(Username);
    if (existingUser) {
      return res.status(400).json({ error: "Användarnamnet är redan taget." });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    // Lägg till användaren i databasen
    await UsersDB.addUser(Username, Displayname, Email, hashedPassword);

    // Hämta det faktiska användarobjektet efter insert
    const user = await UsersDB.getUserByUsername(Username);

    const token = jwt.sign(
      {
        userId: user.Id,
        username: user.Username,
        email: user.Email,
        isAdmin: user.isAdmin,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("authToken", token, {
  httpOnly: true,
  secure: false,
  sameSite: "Lax",
  maxAge: 24 * 60 * 60 * 1000,
});

return res.redirect("/login");

  } catch (error) {
    console.error("Fel vid registrering:", error);
    res.status(500).json({ error: "Registrering misslyckades." });
  }
});


router.post("/login", async (req, res) => {
    try {
        const { Username, Password } = req.body;
        if (!Username || !Password) {
            return res.status(400).json({ error: "Username and Password are required" });
        }

        const user = await UsersDB.getUserByUsername(Username);
        if (!user || !user.Password) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const token = jwt.sign(
            {
                userId: user.Id,          // Kolla exakt fältnamn i din DB-tabell
                username: user.Username,  // Viktigt att det stämmer exakt med DB
                isAdmin: user.isAdmin,
                isBanned: user.isBanned
            },
            SECRET_KEY,
            { expiresIn: "24h" }
        );

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: true,      // true om HTTPS körs
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        console.log("Login successful:", Username);
        return res.redirect("/ChatRoom");

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
