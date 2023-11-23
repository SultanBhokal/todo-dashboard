import express from "express";
import { checkUserAuth, verifyToken } from "../../middlewares/auth/checkUserAuth";
import { login, logout, refreshToken } from "../../controllers/auth/loginController";



const router = express.Router()

router.route("/").get(verifyToken(true));
router.route("/logout").get(logout)
router.route("/refresh").get(refreshToken)
router.route("/login").post(checkUserAuth,login)


export default router;