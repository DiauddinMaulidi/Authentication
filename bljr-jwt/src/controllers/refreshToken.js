import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.sendStatus(401)
        const user = await User.findOne({
            where: { refresh_token: refreshToken }
        })
        if (!user) return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403)
            const id = user.id
            const name = user.name
            const emails = user.email
            const accessToken = jwt.sign({ id, name, emails }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });
            res.json({ accessToken })
        })
    } catch (error) {
        res.send(error.message)
    }
}