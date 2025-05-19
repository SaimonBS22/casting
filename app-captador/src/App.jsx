import React, { useState, useEffect } from 'react';
import ActorList from './components/actorList.jsx';
import './app.css';

const App = () => {
  const [actores, setActores] = useState([]);
  const [actorParaEditar, setActorParaEditar] = useState(null);
  const [filtros, setFiltros] = useState({
    edadMin: '',
    edadMax:'',
    genero: '',
    alturaMin:'',
    alturaMax:'',
    descripcion: '',
  });

  const cargarActores = async () => {
    try {
      const queryParams = new URLSearchParams(filtros).toString();
      const response = await fetch(`http://localhost:8080/api/actores?${queryParams}`);
      const data = await response.json();
      setActores(data);
      console.log('Actores cargados:', data);
    } catch (error) {
      console.error('Error al cargar actores:', error);
    }
  };

 
  const eliminarActor = (id) => {
    setActores(actores.filter((actor) => actor._id !== id)); 
  };

  const editarActor = (actorActualizado) => {
    setActores((prevActores) =>
      prevActores.map((actor) =>
        actor._id === actorActualizado._id ? actorActualizado : actor
      )
    );
  };

  const actualizarActor = (actorActualizado) => {
    setActores(actores.map((actor) => (actor._id === actorActualizado._id ? actorActualizado : actor)));
  };
  


  useEffect(() => {
    cargarActores();
  }, [filtros]);

  return (
    <div className='contenedorPadre'>
      <h1>Plataforma de Casting</h1>
      <ActorList actores={actores} eliminarActor={eliminarActor} editarActor={editarActor} />
      <div className='contenedorFiltros'>
        <h2>Filtros</h2>
          <div className='contenedorInput'>
          <input
            type="number"
            placeholder="Edad mínima"
            value={filtros.edadMin}
            onChange={(e) => setFiltros({ ...filtros, edadMin: e.target.value })}
            className='inputFiltro'
          />
          <input
            type="number"
            placeholder="Edad máxima"
            value={filtros.edadMax}
            onChange={(e) => setFiltros({ ...filtros, edadMax: e.target.value })}
            className='inputFiltro'
          />
          <input
            type="text"
            placeholder="Filtrar por género"
            value={filtros.genero}
            onChange={(e) => setFiltros({ ...filtros, genero: e.target.value })}
            className='inputFiltro'
          />
          <input
              type="number"
              placeholder="Altura mínima"
              value={filtros.alturaMin}
              onChange={(e) => setFiltros({ ...filtros, alturaMin: e.target.value })}
              className='inputFiltro'
            />
          <input
            type="number"
            placeholder="Altura máxima"
            value={filtros.alturaMax}
            onChange={(e) => setFiltros({ ...filtros, alturaMax: e.target.value })}
            className='inputFiltro'
          />
          <input
            type="text"
            placeholder="Filtrar por descripción"
            value={filtros.descripcion}
            onChange={(e) => setFiltros({ ...filtros, descripcion: e.target.value })}
            className='inputFiltro'
          />
          </div>
      </div>

    </div>
  );
};

export default App;

