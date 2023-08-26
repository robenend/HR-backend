const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { employeeID, password } = req.body;
    if (!employeeID || !password) return res.status(400).json({ 'message': 'employeeID and password are required.' });

    const foundUser = await User.findOne({ employeeID: employeeID }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const role = foundUser.role;
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "employeeID": foundUser.employeeID,
                    "role": role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        );
        
        const refreshToken = jwt.sign(
            { "employeeID": foundUser.employeeID },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({accessToken, role});

    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };3