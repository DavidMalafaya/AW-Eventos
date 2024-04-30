const bcrypt = require('bcryptjs/dist/bcrypt');
const authenticateUtil = require('../utils/authenticate.js');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) return res.status(401).json({ msg: "Please enter email and password!"});

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })

        if (user) {
            var passwordIsValid = bcrypt.compareSync(
                password,
                user.password
            );

            if (passwordIsValid) {
                const accessToken = authenticateUtil.generateAccessToken({ id: user.id, name: user.name });
                res.status(200).json({ name: user.name, token: accessToken });
                return;
            } 
        }

        res.status(401).json({ msg: "Invalid email or password!" });

    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}


exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) return res.status(401).json({ msg: "Please enter name, email and password!"});

        await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: bcrypt.hashSync(password, 8),
            },
        })

        return this.signin(req, res);
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}