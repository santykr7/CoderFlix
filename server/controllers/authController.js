const bcrypt = require('bcrypt')
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const signup = async (req, res) => {
    const { username, password } = req.body

    try {
        const hashPassword = await bcrypt.hash(password, 10)
        const admin = new Admin({ username, password: hashPassword })
        await admin.save()
        return res
            .status(201)
            .json({ success: true, message: 'Admin created successfully' })
    } catch (error) {
        return res.status(500).json({ sucess: true, message: error.message })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        let admin = await Admin.findOne({ username })
        if (!admin) {
            return res.status(404)
                .json({ success: false, message: "Admin nahi mila" })
        }
        const comparePassword = await bcrypt.compare(password, admin.password)
        if (!comparePassword) {
            return res.status(404)
                .json({ success: false, message: "Invalid password" })
        }
        const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY, {
            expiresIn: "1d",

        })
        return res.status(200).json({
            success: true,
            message: 'Admin logged in successfully',
            token,
            data: { user: admin.username, token }
        })
    } catch (error) {
        return res.status(500).json({ sucess: true, message: error.message })

    }
}

module.exports = { signup, login }