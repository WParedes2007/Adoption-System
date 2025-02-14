import { Router } from "express";
import { createDate } from "../date/date.controller.js"; // Asegúrate de usar la ruta correcta
import {validarJWT} from "../middlewares/validar-jwt.js";


const router = Router();

// Ruta para crear una nueva cita
router.post("/",
    [validarJWT],
     createDate);

export default router;
