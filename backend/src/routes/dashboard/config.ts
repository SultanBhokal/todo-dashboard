import express from "express";
import { checkUserAuth, verifyToken } from "../../middlewares/auth/checkUserAuth";
import { login, logout, refreshToken } from "../../controllers/auth/loginController";
import { getTodos, updateTodos } from "../../controllers/dashboard/dashboardController";



const router = express.Router()

router.route("/todo").get(verifyToken(false),getTodos)
router.route("/todo").put(verifyToken(false),updateTodos)


export default router;