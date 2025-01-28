import bcryptjs from 'bcryptjs';
import Usuario from '../users/user.model.js';
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async () => {
    const {correo,password} = req.body;
    try {
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg: "Credenciales Incorrectas, Correo No Existente En La Data Base"
            });
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg: "El Usuario No Existe En La Base De Datos"
            });
        }

        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validarPassword){
            return res.status(400).json({
                msg: "La Contraseña Es Incorrecta"
            })
        }

        const token = await generarJWT(usuario.id);
        
        res.status(200).json({
            msg: "Login Ok",
            usuario,
            token
        })

        
    } catch (error) {
        console.log(e);
        res.status(500).json({
            msg: 'Comuniquese Con El Administrador'
        })
    }
}

export const register  = async (req, res) => {
    const {nombre,correo,password,role,phone} = req.body;
    const user = new Usuario({nombre, correo, password, role,phone});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        user
    });
}