import { Router } from "express";
import { login_get, login_post, logout, signup_post } from '../controllers/authController.js'
import { refreshToken } from "../controllers/refreshToken.js";

const router = Router()

router.post('/signup', signup_post);
router.get('/login', login_get);
router.post('/login', login_post);
router.get('/token', refreshToken);
router.delete('/logout', logout);

export default router