import { Router } from 'express';
import { check } from 'express-validator';
import { login, register} from './auth.controller.js';
import {validarCampos} from '../middlewares/validar-campos.js'
import { existenteEmail,esRoleValido } from '../helpers/db-validator.js';

const router = Router();

router.post(
    '/login',
    [
        check("correo","Este No Es Un Correo Valido").isEmail(),
        check("password", "La Contraseña Es Obligatoria").not().isEmpty(),
        validarCampos
    ],
    login
);  

router.post(
    '/register',
    [
        check("nombre", "El Nombre Es Obligatorio").not().isEmpty(),
        check("password", "El Password Debe Ser Mayor A 6 Caracteres").isLength({min:6}),
        check("correo", "Este Correo No Es Valido").isEmail(),
        check("correo").custom(existenteEmail),
        check("role").custom(esRoleValido),
        check('phone', "El Telefono Debe Tener 8 Numeros").isLength({min: 8, max: 8}),
        validarCampos
    ],
    register
);


export default router;