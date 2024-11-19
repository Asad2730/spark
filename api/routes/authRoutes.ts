import { Router } from "express";
import { Login } from "../controllers/auth";


const authRoute = Router();

authRoute.post("/login", Login);

export { authRoute }
