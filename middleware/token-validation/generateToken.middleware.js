const jwt = require('jsonwebtoken');
const jwtSecret = 'pradeepguviproject';

const generateToken = async (payload) => {      
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '24h' });
    return token
}

module.exports = {generateToken};