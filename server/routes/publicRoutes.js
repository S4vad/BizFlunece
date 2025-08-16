import express from "express";

import {
  userSignup,
  googleAuth,
  userLogin,
  getCurrentUser,
} from "../controller/userController.js";

const routes = express.Router();

routes.post("/signup", userSignup);
routes.post("/login", userLogin);
routes.post("/googleAuth", googleAuth);
routes.get("/get-user",getCurrentUser)

export default routes;
