import User from "../users/user.model.js";
import Pet from "../pet/pet.model.js";
import Date from "../date/date.model.js";


export const saveDate = async (req, res) =>{
    try {
        const data = req.body;
        const user = await User.findOne({email: data.email});
        const pet = await Pet.findOne({name: data.name}); 

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Propietario No Encontrado"
            })
        }

        if(!pet){
            return res.status(400).json({
                success: false,
                message: "Mascota No Encontrada"
            })
        }

        const date = new Date({
            ...data,
            keeperUser: user._id,
            keeperPet: pet._id
        });

        await date.save();

        res.status(200).json({
            success: true,
            date
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al guardar la cita",
            error
        })
    }
}