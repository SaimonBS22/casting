import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import actorRoutes from './routes/actorRoutes.js'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname manualmente (porque no existe por defecto en ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear la carpeta 'uploads' si no existe
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

dotenv.config()

const app = express()
const PUERTO = process.env.PUERTO || 8080

app.use(cors())
app.use(express.json())

app.use('/api/actores', actorRoutes)
app.use('/uploads', express.static('uploads'));


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('MongoDB conectado')
    app.listen(PUERTO, ()=> console.log(`Servidor corriendo en el puerto: ${PUERTO}`))
}).catch((err)=>{
    console.error('Error al conectar con MongoDB: ', err)
})

app.get('/', (req, res)=>{
    res.send("Backend listo")
})



