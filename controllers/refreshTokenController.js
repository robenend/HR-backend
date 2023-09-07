const User = require('../models/user');
const jwt = require('jsonwebtoken');

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

module.exports = { handleRefreshToken }