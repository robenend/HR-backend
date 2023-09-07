const User = require('../models/user')
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { employeeID, password } = req.body;
    if (!employeeID || !password) return res.status(400).json({ 'message': 'employeeID and password are required.' });
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({employeeID: employeeID}).exec();
    
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);
        //store the new user
        const result = await User.create({
            employeeID: employeeID,
            password: hashedPwd
        })
        res.status(201).json({ 'success': `New user ${employeeID} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };