const verifyAdmin =  (req, res, next) => {
        if (!req?.role) return res.sendStatus(401);
        const result = req.role === "admin"
        if (!result) return res.sendStatus(401);
        next();     
}

module.exports = {verifyAdmin}