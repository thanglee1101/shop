const User = require('../model/user');
const { sign } = require('../utils/jwt');
const { matchPassword, hashPassword } = require('../utils/password')

class UserController {
    async login(req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;
            if (!username) {
                res.status(401)
                throw new Error("Username is requied");
            }
            if (!password) {
                res.status(401)
                throw new Error("Password is requied");
            }
            const existingUser = User.find({ username: username });
            if (!existingUser) {
                res.status(401)
                throw new Error("Account does not exist")
            }
            const passwordMatch = await matchPassword(existingUser.password, password)
            if (!passwordMatch) {
                res.status(401)
                throw new Error('Wrong password or username')
            }
            delete existingUser.password
            existingUser.token = await sign({ email: existingUser.email, username: existingUser.username })
            res.status(200).json(existingUser)
        } catch (e) {
            const status = res.statusCode ? res.statusCode : 500
            res.status(status).json({
                error: {
                    body: [
                        'Could not login',
                        e.message
                    ]
                }
            })
        }

    }
    async Signup(req, res) {
        // console.log(req.body)
        // console.log(req.body)

        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        if (!email) {
            res.status(401)
            throw new Error("Email is requied");
        }
        if (!username) {
            res.status(401)
            throw new Error("Username is requied");
        }
        if (!password) {
            res.status(401)
            throw new Error("Password is requied");
        }
        const existingUser = await User.findOne({ username: username });
        console.log(existingUser)
        if (existingUser) {
            res.status(401).json({ mess: "Account is existed" })
            throw new Error("Account is existed")
                // res.status(200).json(existingUser)
        }
        const user = await User.create({
            email: email,
            username: username,
            password: await hashPassword(password)
        })

        // res.render('users/login')
        if (user) {
            if (user.password) {
                user.password = null
            }
            console.log(user.password)
            user.token = await sign(user)
            user.bio = null
            user.img = null
            res.status(200).json(user)

        }
    }
    async updateUser(req, res) {
        const user = req.body;
        // res.status(200).json({ user: user })
        if (!user) {
            return res.status(401).json({ message: "Requied a User Object" })
        }

        const target = await User.findOne({ email: user.username }).exec()
        if (!target) {
            res.status(404)
            throw new Error("User not found")
        }
        if (user.username) {
            target.username = user.username
        }
        if (user.email) {
            const paw = await hashPassword(user.password)
            target.password = paw
        }
        if (user.email) {
            target.email = email
        }
        if (typeof user.img != "undefined") {
            target.img = user.img
        }
        if (typeof user.bio !== "undefined") {
            target.bio = user.bio
        }
        await target.save();
        target.password = null
        return res.status(200).json(target)

    }
}
module.exports = new UserController;