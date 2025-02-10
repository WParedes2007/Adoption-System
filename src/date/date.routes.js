import { Router } from "express";
import { check } from "express-validator";
import { saveDate } from "./date.controller.js";
import {validarCampos} from "../middlewares/validar-campos.js";
import {validarJWT} from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check("email", "Este No Es Un Correo Valido").not().isEmpty(),
        check("name", "El Nombre De La Mascota  Es Obligatorio").not().isEmpty(),
        check("day", "El Dia De La Cita  Es Obligatorio").not().isEmpty(),
        check("hour", "La Hora De La Cita Es Obligatoria").not().isEmpty(),
        validarCampos
    ],
    saveDate
)

export default router;