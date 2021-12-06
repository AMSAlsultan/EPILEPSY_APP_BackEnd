const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/Users\/desig\/EPILEPSY_APP\/backend\/tmp\/my-uploads(.*)/, methods: ['GET', 'OPTIONS'] },
        ]
    })
}

async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
}

module.exports = authJwt;