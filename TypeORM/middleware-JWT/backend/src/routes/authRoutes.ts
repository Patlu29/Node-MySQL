import express from "express";
import { login, register, home, AllUsers } from "../controllers/authController";
import {
  registerMiddleware,
  loginMiddleware,
} from "../middleware/authentication";
import {
  authorizeAdminMiddleware,
  authorizeMiddleware,
} from "../middleware/authorization";

const router = express.Router();

router.post("/register", registerMiddleware, register);
router.post("/login", login);
router.get("/home", authorizeMiddleware, home);
router.get("/users", authorizeAdminMiddleware, AllUsers);

export default router;
