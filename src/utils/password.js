const bcrypt = require('bcrypt')

const saltRounds = 10
module.exports.hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, encrypted) => {
            if (err) {
                return reject(err)
            }
            return resolve(encrypted)
        })
    })
}
module.exports.matchPassword = (hash, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, same) => {
            if (err) {
                return reject(err)
            }
            return resolve(same)
        })
    })
}