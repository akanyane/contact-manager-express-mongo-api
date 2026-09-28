import express from "express";
import { registerUser, loginUser, currentUser } from "../controllers/user.controller";
import validateToken from "../middlewares/validateTokenHandler";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

export default router;
