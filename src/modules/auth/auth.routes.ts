import { Router } from "express";
import { validate } from "../../shared/middleware/schema.middleware";
import { login, refresh, register } from "./auth.controller";
import { LoginSchema, RegisterSchema } from "./auth.types";

const router = Router();

router.post("/register", validate(RegisterSchema), register);
router.post("/login", validate(LoginSchema), login);
router.post("/refresh", refresh);


export default router;
