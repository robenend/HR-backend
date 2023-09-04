const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    employeeID: {
        type: String,
        required: true
    },
    role: {
        type: String, 
        default: "user"
    },
    password: {
        type: String,
        required: true
    },
    refreshTokens: {
        type: [String],
        default: [],
    }
});

module.exports = mongoose.model('User', userSchema);