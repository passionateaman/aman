const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User'); // Make sure this path is correct based on your project structure

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists in the database
        let user = await User.findOne({ email });

        if (!user) {
            // If user does not exist, create a new one with the provided email and password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            user = new User({
                email,
                password: hashedPassword
            });

            await user.save();
        } else {
            // If user exists, compare the provided password with the stored hashed password
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }
        }

        // If everything is good, return a success message
        res.json({ msg: 'Login successful', user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
