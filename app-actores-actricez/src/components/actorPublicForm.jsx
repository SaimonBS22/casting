import { useState } from 'react';
import '../styles/styles.css'

const ActorPublicForm = () => {
  const [foto, setFoto] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: '',
    edad: '',
    genero: '',
    altura: '',
    descripcion: '',
    email:'',
    cuit:'',
    celular:'',
    dni:'',
    nacionalidad:''
  });

  const [error, setError] = useState({
    nombre: '',
    edad: '',
    genero: '',
    altura: '',
    descripcion: '',
    email:'',
    cuit:'',
    celular:'',
    dni:'',
    nacionalidad:'',
    foto: '',
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newError = {
      nombre: '',
      edad: '',
      genero: '',
      altura: '',
      descripcion: '',
      email:'',
      cuit:'',
      celular:'',
      dni:'',
      nacionalidad:'',
      foto: '',
    };

    //Validacion Cuit
    if(!formulario.cuit || !/^\d{2}-\d{8}-\d{1}$/.test(formulario.cuit)){
      newError.cuit = 'El formato de cuit es xx-xxxxxxxx-x'
      isValid = false
    }

    //Validacion DNI
    if(!formulario.dni || !/^\d{8}$/.test(formulario.dni)){
      newError.dni = 'El DNI esta mal redactado'
      isValid = false
      }

    //Validacion celular
    if(!formulario.celular || !/^\d{10}$/.test(formulario.celular)){
      newError.celular = 'El Celular esta mal redactado'
      isValid = false
    }

      //Validacion Cuit
      if(!formulario.nacionalidad){
        newError.nacionalidad = 'La nacionalidad es obligatorio'
        isValid = false
      }

    //validacion de email
    if(!formulario.email){
      newError.email = 'El email es obligatorio'
      isValid = false
    }

    // Validación de nombre
    if (!formulario.nombre) {
      newError.nombre = 'El nombre es obligatorio';
      isValid = false;
    }

    // Validación de edad
    if (!formulario.edad || formulario.edad < 10 || formulario.edad > 100) {
      newError.edad = 'Ingrese una edad valida';
      isValid = false;
    }

    // Validación de género
    if (!formulario.genero || !['mujer', 'hombre', 'no especificar'].includes(formulario.genero.toLocaleLowerCase())) {
      newError.genero = 'El género es obligatorio';
      isValid = false;
    }

    // Validación de altura
    if (!formulario.altura || formulario.altura <= 0 || formulario.altura >= 230) {
      newError.altura = 'Ingrese una altura valida';
      isValid = false;
    }

    // Validación de descripción
    if (!formulario.descripcion) {
      newError.descripcion = 'La descripción es obligatoria';
      isValid = false;
    }

    // Validación de foto
    if (!foto) {
      newError.foto = 'La foto es obligatoria';
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario
    if (!validateForm()) {
      return; // No hacer nada si hay errores
    }

    const formData = new FormData();
    formData.append('nombre', formulario.nombre);
    formData.append('edad', formulario.edad);
    formData.append('genero', formulario.genero);
    formData.append('altura', formulario.altura);
    formData.append('descripcion', formulario.descripcion);
    formData.append('email', formulario.email)
    formData.append('cuit', formulario.cuit)
    formData.append('dni', formulario.dni)
    formData.append('celular', formulario.celular)
    formData.append('nacionalidad', formulario.nacionalidad)
    formData.append('foto', foto); // archivo

    try {
      const res = await fetch('http://localhost:8080/api/actores', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('¡Gracias! Tus datos fueron enviados.');
        setFormulario({
          nombre: '',
          edad: '',
          genero: '',
          altura: '',
          descripcion: '',
          email:'',
          cuit:'',
          celular:'',
          dni:'',
          nacionalidad:''
        });
        setFoto(null);
      } else {
        alert('Hubo un error al enviar tus datos.');
      }
    } catch (err) {
      console.error('Error al enviar datos:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='formulario'>
      <h2>Subí tus datos para el casting</h2>


      <input
        className='input'
        name="nombre"
        placeholder="Nombre y Apellido"
        value={formulario.nombre}
        onChange={handleChange}
        required
      />
      {error.nombre && <span className="error">{error.nombre}</span>}

      <input
        className='input'
        name="edad"
        type="number"
        placeholder="Edad"
        value={formulario.edad}
        onChange={handleChange}
        required
      />
      {error.edad && <span className="error">{error.edad}</span>}

      <select  
        className='input'
        name="genero"
        placeholder="Género"
        value={formulario.genero}
        onChange={handleChange}
        required >
          <option value="">Seleccione una opcion</option>
        <option value="Hombre">Hombre</option>
        <option value="Mujer">Mujer</option>
        <option value="No especificar">No especificar</option>
      </select>

      {error.genero && <span className="error">{error.genero}</span>}

      <input
        className='input'
        name="altura"
        type="number"
        placeholder="Altura (cm)"
        value={formulario.altura}
        onChange={handleChange}
        required
      />
      {error.altura && <span className="error">{error.altura}</span>}


      <input 
      className='input'
      name='email'
      type="email" 
      placeholder='ejemplo@mail.com'
      value={formulario.email}
      onChange={handleChange}
      required
      />
      {error.email && <span className='error'>{error.email}</span>}

      <input 
      className='input'
      name='cuit'
      type="text" 
      placeholder='Cuit'
      value={formulario.cuit}
      onChange={handleChange}
      required
      />
      {error.cuit && <span className='error'>{error.cuit}</span>}

      <input 
      className='input'
      name='dni'
      type="number" 
      placeholder='DNI'
      value={formulario.dni}
      onChange={handleChange}
      required
      />
      {error.dni && <span className='error'>{error.dni}</span>}

      <input 
      className='input'
      name='celular'
      type="number" 
      placeholder='Celular'
      value={formulario.celular}
      onChange={handleChange}
      required
      />
      {error.celular && <span className='error'>{error.celular}</span>}

      <input 
      className='input'
      name='nacionalidad'
      type="string" 
      placeholder='Nacionalidad'
      value={formulario.nacionalidad}
      onChange={handleChange}
      required
      />
      {error.nacionalidad && <span className='error'>{error.nacionalidad}</span>}

      <textarea
        className='textarea'
        name="descripcion"
        placeholder="Descripción breve"
        value={formulario.descripcion}
        onChange={handleChange}
        required
      />
      {error.descripcion && <span className="error">{error.descripcion}</span>}
      <input
        className='input'
        type="file"
        accept="image/*"
        onChange={(e) => setFoto(e.target.files[0])}
        required
      />
      {error.foto && <span className="error">{error.foto}</span>}



      <button className='boton' type="submit">Enviar</button>
    </form>
  );
};

export default ActorPublicForm;
