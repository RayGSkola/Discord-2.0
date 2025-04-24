const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UsersDB = require("../models/UsersDB.js");

const router = express.Router();
const SECRET_KEY = "!wolley dna kcalb ,hoO kcalb ,wolleY .kcalb ,wolleY .kcalb ,wolleY .kcalb ,wolleY elbissopmi si kniht snamuh tahw erac tnod seeb esuaceb yawyna seilf ,esruoc fo ,eeb ehT dnuorg eht ffo ydob elttil taf sti teg ot llams oot era sgniw stI ylf ot elba eb dluohs eeb a yaw on si ereht ,noitaiva fo swal nwonk lla ot gnidroccA";

router.post("/register", async (req, res) => {
    try {
        const { Username, Password, Email, Displayname } = req.body;
        const existingUser = await UsersDB.getUserByUsername(Username);
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        await UsersDB.addUser(Username, Displayname || Username, Email, hashedPassword);

        console.log("User registered successfully:", Username);
        return res.redirect("/ChatRoom");  

    } catch (error) {
        console.log("Registration error:", error);
        res.status(500).json({ error: "Internal Server Error" });
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

        const token = jwt.sign({ userId: user.id, username: user.Username }, SECRET_KEY, { expiresIn: "24h" });

        res.cookie("authToken", token, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 24 * 60 * 60 * 1000 });

        console.log("Login successful:", Username);
        return res.redirect("/ChatRoom") 

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
