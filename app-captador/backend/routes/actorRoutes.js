import express from 'express'
import Actor from '../model/actorSchema.js'
import multer from 'multer'
import path from 'path'

const router = express.Router()


// Configurar dónde guardar las imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // O donde quieras
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// Inicializar multer
const upload = multer({ storage });


router.post('/', upload.single('foto'), async (req, res) => {
  try {
    console.log('Body recibido:', req.body);
    console.log('Archivo recibido:', req.file);

    if (!req.body.email) {
      return res.status(400).json({ error: 'El email es obligatorio' });
    }

    const nuevoActor = new Actor({
      nombre: req.body.nombre,
      edad: req.body.edad,
      genero: req.body.genero,
      altura: req.body.altura,
      descripcion: req.body.descripcion,
      email: req.body.email,
      nacionalidad: req.body.nacionalidad,
      cuit: req.body.cuit,
      dni: req.body.dni,
      celular: req.body.celular,
      foto: req.file ? req.file.filename : null,
      fotoUrl: req.file ? `http://localhost:8080/uploads/${req.file.filename}` : null,
    });

    await nuevoActor.save();
    res.status(201).json(nuevoActor);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});



router.get('/', async (req, res) => {
  try {
    const { 
      edadMin, edadMax, 
      genero, 
      alturaMin, alturaMax, 
      descripcion, 
      email, 
      nacionalidad, 
      cuit, 
      dni, 
      celular 
    } = req.query;

    const filtro = {};

    if (edadMin || edadMax) {
      filtro.edad = {};
      if (edadMin) filtro.edad.$gte = Number(edadMin);
      if (edadMax) filtro.edad.$lte = Number(edadMax);
    }

    if (genero) {
      filtro.genero = genero.charAt(0).toUpperCase() + genero.slice(1).toLowerCase();
    }

    if (alturaMin || alturaMax) {
      filtro.altura = {};
      if (alturaMin) filtro.altura.$gte = Number(alturaMin);
      if (alturaMax) filtro.altura.$lte = Number(alturaMax);
    }

    if (descripcion) {
      filtro.descripcion = { $regex: descripcion, $options: 'i' };
    }

    if (email) {
      filtro.email = { $regex: email, $options: 'i' };
    }

    if (nacionalidad) {
      filtro.nacionalidad = { $regex: nacionalidad, $options: 'i' };
    }

    if (cuit) {
      filtro.cuit = Number(cuit);
    }

    if (dni) {
      filtro.dni = Number(dni);
    }

    if (celular) {
      filtro.celular = Number(celular);
    }

    const actores = await Actor.find(filtro);
    res.json(actores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const actor = await Actor.findByIdAndDelete(id);
    if (!actor) {
      return res.status(404).json({ mensaje: 'Actor no encontrado' });
    }

    res.json({ mensaje: `El actor con ID ${id} ha sido eliminado` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, edad, genero, altura, descripcion,email, cuit, dni, celular, nacionalidad } = req.body;

    if (genero) {
      req.body.genero = genero.charAt(0).toUpperCase() + genero.slice(1).toLowerCase();
    }

    const actorActualizado = await Actor.findByIdAndUpdate(
      id,
      { nombre, edad, genero, altura, descripcion, email, cuit, dni, celular, nacionalidad },
      { new: true }
    );

    if (!actorActualizado) {
      return res.status(404).json({ error: 'Actor no encontrado' });
    }

    res.json(actorActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// Ruta para eliminar todos los actores
router.delete('/eliminar-todos', async (req, res) => {
  try {
    const result = await Actor.deleteMany(); // Elimina todos los documentos de la colección Actor
    res.status(200).json({ message: 'Todos los actores han sido eliminados', result });
  } catch (error) {
    res.status(500).json({ error: 'Hubo un problema al eliminar los actores', details: error });
  }
});




export default router;