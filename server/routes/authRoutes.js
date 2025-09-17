import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  signup,
  logout,
  login,
  verifyToken,
  getCurrentUser,
  googleAuth,
} from "../controller/userController.js";

const routes = express.Router();

routes.post("/signup", signup);
routes.post("/login", login);
routes.post("/logout", logout);
routes.get("/auth/verify", authMiddleware, verifyToken);
routes.get("/get-user", getCurrentUser);
routes.post("/googleAuth", googleAuth);

export default routes;
