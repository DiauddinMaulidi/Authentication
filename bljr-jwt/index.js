import express from 'express'
import ejs from 'ejs'
import url from 'url'
import path from 'path'
import router from './src/routes/authRouter.js'
import user from './src/models/User.js'
import dotenv from 'dotenv'
import { verifyToken } from './src/middleware/VerifyToken.js'
import cookieParser from 'cookie-parser'
import cors from 'cors';

const app = express()
app.use(express.json())
app.use(cookieParser())
dotenv.config()
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }))

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
app.set('views', path.join(__dirname, '/src/views'))

app.use(express.static(path.join(__dirname, '/public')))

app.set('view engine', 'ejs')
app.engine('html', ejs.renderFile)

app.get('/', verifyToken, async (req, res) => {
    try {
        const datas = await user.findAll({ attributes: ["id", "name", "email"] })
        res.json(datas)
    } catch (error) {
        console.log(error);
    }
    // res.render('index.html')
})

app.get('/data', async (req, res) => {
    const datas = await user.findAll()
    res.json(datas)
})
app.use(router)

app.listen(3000, () => {
    console.log("berhasil berjalan di port http://localhost:3000");
})