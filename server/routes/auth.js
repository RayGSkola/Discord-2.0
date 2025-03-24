const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UsersDB = require("../models/UsersDB.js");

const router = express.Router();
const SECRET_KEY = "Hemlig_Nyckel";

router.post("/register", async (req, res) => {
    try {
        const { Username, Password } = req.body;
        const existingUser = await getUserByUsername(Username);
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const hashedPassword = await bcrypt.hash(Password, 10); // Hashing the password

        const newUser = await UsersDB.addUser(Username, Displayname, Email, hashedPassword);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("Oh no, something went wrong", error);
        throw new Error("Post register");
    }
});

module.exports = router;  // Export router here
