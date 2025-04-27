import express from "express";

import {
  userSignup,
  googleAuth,
  userLogin,
} from "../controller/userController.js";

const routes = express.Router();

routes.post("/signup", userSignup);
routes.post("/login", userLogin);
routes.post("/googleAuth", googleAuth);

export default routes;
