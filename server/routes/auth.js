const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UsersDB = require("../models/UsersDB.js");

const router = express.Router();
const SECRET_KEY = "Hemlig_Nyckel";

router.post("/register", async (req, res) => {
    try {
        const { Username, Password, Email, Displayname } = req.body;
        const existingUser = await UsersDB.getUserByUsername(Username);
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        } 

        const hashedPassword = await bcrypt.hash(Password, 10); 
        console.log("🔒 Hashed Password Being Stored:", hashedPassword);

        const newUser = await UsersDB.addUser(Username, Displayname || Username, Email, hashedPassword);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("Oh no, something went wrong", error);
        throw new Error("Post register");
    }
});

router.post("/login", async (req, res) => {
    try {
        const { Username, Password } = req.body;
        
        if (!Username || !Password) {
            return res.status(400).json({ error: "Username and Password are required" });
        }

        const user = await UsersDB.getUserByUsername(Username);

        console.log("🔍 User Found:", user); 
        console.log("🔑 Entered Password:", Password); 
        console.log("🔒 Stored Hashed Password:", user.Password);


        if (!user || !user.Password) { 
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        console.log("✅ Password Match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const token = jwt.sign({ id: user.Id, username: user.Username }, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({
            message: "Login successful",
            token: token
        });

    } catch (error) {
        console.error("❌ Error in /login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router; 
