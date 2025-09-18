import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  signup,
  logout,
  login,
  verifyToken,
  getCurrentUser,
  googleAuth,
  forgotPassword,
  resetPassword,
  verifyResetToken,
} from "../controller/userController.js";

const routes = express.Router();

routes.post("/signup", signup);
routes.post("/login", login);
routes.post("/logout", logout);
routes.get("/auth/verify", authMiddleware, verifyToken);
routes.get("/get-user", getCurrentUser);
routes.post("/googleAuth", googleAuth);

routes.post("/forgot-password", forgotPassword);
routes.post("/reset-password", resetPassword);
routes.get("/verify-reset-token/:token", verifyResetToken);

export default routes;
