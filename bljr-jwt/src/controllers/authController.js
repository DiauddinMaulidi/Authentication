import user from "../models/User.js"
import { compare } from "../models/utils/bcrypt.js"
import jwt from 'jsonwebtoken'

export const getUsers = async (req, res) => {
    try {
        const datas = await user.findAll({ where: { email: req.email }, attributes: ["id", "name", "email"] })
        res.json(datas)
    } catch (error) {
        console.log(error);
    }
}
export const signup_post = async (req, res) => {
    const { name, email, password, confPassword } = req.body;

    const datas = await user.findOne({ where: { email: email } })
    if (datas) return res.status(404).send("Email sudah digunakan, silahkan ganti yang lain")
    if (password !== confPassword) return res.status(404).send("password dan confirmasi password anda salah")
    try {
        await user.create({
            name,
            email,
            password,
        })
        res.send("signup berhasil")
    } catch (error) {
        res.send(error.message)
    }
}
export const login_get = (req, res) => {
    res.render("login.html")
}
export const login_post = async (req, res) => {
    try {
        const { email, password } = req.body;

        const data = await user.findAll({ where: { email: email } })
        if (data.length === 0) return res.status(404).send("Email yang anda gunakan tidak terdaftar, silahkan lihat lagi")
        const matchPass = compare(password, data[0].password)
        if (!matchPass) return res.status(404).json("password anda salah, silahkan lihat lagi");

        const userId = data[0].id;
        const name = data[0].name;
        const emails = data[0].email;
        const accessToken = jwt.sign({ userId, name, emails }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({ userId, name, emails }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await user.update({ refresh_token: refreshToken }, { where: { id: userId } });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        })
        res.json({ accessToken });
    } catch (error) {
        res.status(404).send(error.message)
    }
}

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(201)
    const dataUser = await user.findOne({
        where: { refresh_token: refreshToken }
    })
    const id = dataUser.id
    await user.update({ refresh_token: null }, {
        where: {
            id: id,
        }
    })
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}