const expressJwt = require('express-jwt');
const config = require('../configure.json');
const userService = require('./user_model');

module.exports = jwt;

function jwt() {
    const secret = config.key_secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication

            '/user/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};
