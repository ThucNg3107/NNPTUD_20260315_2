let fs = require('fs')
let path = require('path')
let jwt = require('jsonwebtoken')

let privateKeyPath = path.join(__dirname, '..', 'keys', 'jwtRS256.key')
let publicKeyPath = path.join(__dirname, '..', 'keys', 'jwtRS256.key.pub')

let privateKey = fs.readFileSync(privateKeyPath, 'utf8')
let publicKey = fs.readFileSync(publicKeyPath, 'utf8')

module.exports = {
    signAccessToken: function (payload) {
        return jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '1d'
        })
    },
    verifyAccessToken: function (token) {
        return jwt.verify(token, publicKey, {
            algorithms: ['RS256']
        })
    }
}
