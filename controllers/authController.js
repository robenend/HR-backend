const User = require('../models/user');
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
                    "role": foundUser.role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15s' }
        );
        
        const refreshToken = jwt.sign(
            { "employeeID": foundUser.employeeID },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshTokens.push(refreshToken);
        await foundUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.status(200).json({accessToken, role});

    } else {
        res.sendStatus(401);
    }
}

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = foundUser.refreshToken.filter(token => token !== refreshToken);    
    const result = await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

const handleRefreshToken = async (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
        const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshTokens: refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.employeeID !== decoded.employeeID) return res.sendStatus(403);
            console.log(foundUser)
            const role = foundUser.role
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "employeeID": decoded.employeeID,
                        "role": role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ role, accessToken })
        }
    );
}

module.exports = { handleLogin, handleRefreshToken, handleLogout };