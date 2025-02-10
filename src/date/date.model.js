import { Schema, model } from "mongoose";

const DateSchema = Schema({
    fecha:{
        type: String,
        required: true
    },
    keeperUser:{
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    keeperPet:{
        type: Schema.Types.ObjectId,
        ref: "pet",
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},{
    timestamps: true,
    versionKey: false
});

export default model("Date", DateSchema);