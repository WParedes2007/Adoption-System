import User from "../users/user.model.js";
import Pet from "../pet/pet.model.js";

export const savePet = async (req, res) =>{
    try {
        const data = req.body;
        const user = await User.findOne({email: data.email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Propietario No Encontrado"
            })
        }

        const pet = new Pet({
            ...data,
            keeper: user._id
        });

        await pet.save();

        res.status(200).json({
            success: true,
            pet
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al guardar la mascota",
            error
        })
    }
}

export const getPets = async(req, res) => {
    const {limite = 10, desde = 0} = req.query;
    const query = {status: true};
    try {
        const pets = await Pet.find(query)
            .skip(Number(desde))
            .limit(Number(limite));
            
        const petsWithOwnerNames =  await Promise.all(pets.map(async (pet) =>{
            const owner = await User.findById(pet.keeper);
            return{
                ...pet.toObject(),
                keeper: owner ? owner.nombre: "Propietario No Encontrado"
            }
        }));
        
        const total = await Pet.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            pets: petsWithOwnerNames
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener la mascota",
            error
        })
    }
}

export const searchPet = async (req, res) =>{
    const {id} = req.params;

    try {
        const pet = await Pet.findById(id);

        if(!pet){
            return res.status(404)({
                success: false,
                message: "Mascota No Encontrada"
            })
        }

        const owner = await User.findById(pet.keeper);

        res.status(200).json({
            success: true,
            pet: {
                ...pet.toObject(),
                keeper: owner ? owner.nombre : "Propietario No Encontrado"
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al buscar la mascota",
            error
        })
    }
}

export const deletePet = async(req, res) => {

    const {id} = req.params;

    try {
        await Pet.findByIdAndUpdate(id, {status: false});
        
        res.status(200).json({
            success: true,
            message: "Mascota Eliminada Exitosamente"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al desactivar la mascota",
            error
        })
    }

}

export const updatePet = async(req, res = response) => {
    try {

        const {id} = req.params;
        const { _id, keeper, ...data } = req.body;
                
        const pet = await Pet.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            success: true,
            msg: "Mascota Actualizada!",
            pet
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error Al Actualizar Mascota",
            error
        })
    }
}
