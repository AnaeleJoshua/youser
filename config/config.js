const dotenv = require('dotenv').config()
module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpirationInSeconds: 60 * 60, // 1 hour
    roles: {
      USER: 'user',
      ADMIN: 'admin'
    },
    productPriceUnits: {
      DOLLAR: 'dollar',
      EURO: 'euro',
      NAIRA: 'naira'
    }
}