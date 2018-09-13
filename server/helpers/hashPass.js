require('dotenv').config();

const crypto = require('crypto');

const hashPass = (password)=> {
    const hash = crypto.createHmac('sha256', 'anything')
                        .update(password)
                        .digest('hex')
    return hash
}

module.exports = hashPass
