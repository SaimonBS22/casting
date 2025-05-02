import mongoose, { trusted } from "mongoose";

const actorSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    edad:{
        type: Number,
        required: true
    },
    genero:{
        type: String,
        enum:['Hombre', 'Mujer', 'No especificar'],
        required: true
    },
    altura:{
        type:Number,
        required:true
    },
    descripcion:{
        type:String
    },
    dni:{
        type:Number,
        required: true
       
    },
    cuit:{
        type:String,
        required: true
        
    },
    celular:{
        type:Number,
        required: true
       
    },
    nacionalidad:{
        type:String,
        required:true
        
    },
    email:{
        type:String,
        required:true
    },
    foto: {
        type: String
    },
    fotoUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Actor = mongoose.model("Actor", actorSchema);

export default Actor;
