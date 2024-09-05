const User = require('../models/User.model');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    try {
        let { name, email, password, role } = req.body;

        if (!role) {
            role = 'user';
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.HASH_PASS));

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const accessToken = jwt.sign(
            {
                id: foundUser._id,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role
            },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            {
                id: foundUser._id,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role
            },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('SweetSpotToken', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: 'Login successful',
            accessToken,
            userData: {
                id: foundUser._id,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies.SweetSpotToken;
        if (refreshToken) {
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(406).json({ message: 'Unauthorized' });
                } else {
                    const accessToken = jwt.sign(
                        { id: decoded.id, name: decoded.name, email: decoded.email, role: decoded.role },
                        process.env.JWT_ACCESS_SECRET,
                        { expiresIn: '1h' }
                    );
                    return res.status(200).json({
                        message: 'Token refreshed successfully',
                        accessToken,
                        userData: {
                            id: decoded.id,
                            name: decoded.name,
                            email: decoded.email,
                            role: decoded.role
                        },
                    });
                }
            });
        } else {
            return res.status(406).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const logOut = (req, res) => {
    res.cookie('SweetSpotToken', null, {
        httpOnly: true,
        secure: true,
        maxAge: 1,
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
    signUp,
    logIn,
    refresh,
    logOut
};
