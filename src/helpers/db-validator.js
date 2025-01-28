import Role from '../role/role.model.js';
import Usuario from '../users/user.model.js';

export const esRoleValido = async (role = "") => {
    const existeRol = await Role.findOne({role});

    if(!existeRol){
        throw new Error(`El Rol ${role} No Existe Dentro De La Data Base`);
    }
}

export const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});

    if(existeEmail){
        throw new Error(`El Correo ${correo} Ya Existe En La Data Base`);
    }
}